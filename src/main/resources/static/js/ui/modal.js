import {loadDevices, loadSubDevicesByDevice} from "./selectLoader.js";
import {addPart, addPartToComponent} from "../api/partsApi.js";
import {loadStructure} from "../pages/fullStructure.js";
import {submitEntity} from "../ui/entityHandler.js";
import {getPartsByComponentId} from "../api/componentsPartsApi.js";


function handleSubmit() {
    const name = document.getElementById("entity-name-input").value.trim();
    const selectDevice = document.getElementById("device-select")?.value;
    const selectSubDevice = document.getElementById("subDevice-select")?.value;
    const additionalInfo = document.getElementById("extra-info-input")?.value;
    const message = document.getElementById("entity-message");

    submitEntity(name, selectDevice, selectSubDevice, additionalInfo, message).then(r => console.log("Entity submitted"));
}

export function openEntityModal(type) {
    const modal = document.getElementById("add-entity-modal");
    const title = document.getElementById("modal-title");
    const selectContainer = document.getElementById("relation-select-container");
    const selectDevice = document.getElementById("device-select");
    const selectSubDevice = document.getElementById("subDevice-select");
    const extraInfoContainer = document.getElementById("extra-info-container");
    const extraInfoInput = document.getElementById("extra-info-input");
    const partExtraFields = document.getElementById("part-extra-fields");


    modal.style.display = "flex";
    selectDevice.innerHTML = "";
    extraInfoContainer.style.display = "none";
    extraInfoInput.value = "";
    selectDevice.style.display = "none";
    selectSubDevice.style.display = "none";
    partExtraFields.style.display = "none";


    if (type === "device") {
        title.innerText = "Добави устройство";
        selectContainer.style.display = "flex";
    }

    if (type === "subDevice") {
        title.innerText = "Добави подустройство";
        selectContainer.style.display = "flex";

        selectDevice.style.display = "block";     // 👈 само това
        selectSubDevice.style.display = "none";   // ❌ скриваме

        loadDevices(selectDevice);
    }


    if (type === "component") {
        title.innerText = "Добави компонент";
        selectContainer.style.display = "flex";
        extraInfoContainer.style.display = "block";

        selectDevice.style.display = "block";     // 👈 показваме и двете
        selectSubDevice.style.display = "block";

        selectDevice.innerHTML = "";
        selectSubDevice.innerHTML = "<option>Първо избери устройство</option>";

        loadDevices(selectDevice);

        selectDevice.onchange = () => {
            selectSubDevice.innerHTML = "<option>Зареждане...</option>";
            // TODO: Repair selectSubDevice to take ID, not name!
            loadSubDevicesByDevice(selectSubDevice, selectDevice.value);
        };
    }
    if (type === "part") {
        title.innerText = "Добави част";

        selectContainer.style.display = "none";
        partExtraFields.style.display = "none";

        extraInfoContainer.style.display = "block";
    }


    document.getElementById("entity-name-input").value = "";
    document.getElementById("entity-message").innerText = "";

}


export function openAddPartToComponent(componentId) {
    window.currentComponentId = componentId; // 👈 глобално

    openEntityModal("part");
}

export async function openEditComponentModal(component) {
    const modal = document.getElementById("edit-component-modal");
    const content = document.getElementById("edit-component-content");

    modal.style.display = "flex";
    content.innerHTML = "";

    const title = document.createElement("h3");
    title.textContent = `Компонент: ${component.name}`;
    content.appendChild(title);

    const parts = await getPartsByComponentId(component.id);

    if (!parts || parts.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "Няма части";
        content.appendChild(empty);
        return;
    }

    // 👉 ще пазим input-ите
    const editedParts = [];

    parts.forEach((part, index) => {

        const wrapper = document.createElement("div");
        wrapper.style.border = "1px solid #ccc";
        wrapper.style.padding = "8px";
        wrapper.style.marginBottom = "8px";

        const label = document.createElement("div");
        label.textContent = `Част ${index + 1}`;
        label.style.fontWeight = "bold";

        const nameInput = document.createElement("input");
        nameInput.value = part.partName;

        const descInput = document.createElement("input");
        descInput.value = part.description;

        const qtyInput = document.createElement("input");
        qtyInput.type = "number";
        qtyInput.value = part.quantity;

        const sapInput = document.createElement("input");
        sapInput.value = part.sapNumber;

        [nameInput, descInput, qtyInput, sapInput].forEach(i => {
            i.style.display = "block";
            i.style.marginTop = "5px";
            i.style.width = "100%";
        });

        wrapper.appendChild(label);
        wrapper.appendChild(nameInput);
        wrapper.appendChild(descInput);
        wrapper.appendChild(qtyInput);
        wrapper.appendChild(sapInput);

        content.appendChild(wrapper);

        // 👉 пазим референция
        editedParts.push({
            partId: part.partId,
            nameInput,
            descInput,
            qtyInput,
            sapInput
        });
    });

    // 👉 SAVE BUTTON
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Запази";
    saveBtn.style.marginTop = "10px";

    saveBtn.onclick = async () => {

        try {
            for (const p of editedParts) {

                const original = parts.find(x => x.partId === p.partId);

                const newName = p.nameInput.value;
                const newDesc = p.descInput.value;
                const newSap = p.sapInput.value;
                const newQty = parseInt(p.qtyInput.value);

                const partChanged =
                    original.partName !== newName ||
                    original.description !== newDesc ||
                    original.sapNumber !== newSap;

                const qtyChanged =
                    original.quantity !== newQty;

                if (partChanged) {
                    await fetch(`/api/parts/${p.partId}`, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        credentials: "include",
                        body: JSON.stringify({
                            name: newName,
                            description: newDesc,
                            sapNumber: newSap
                        })
                    });
                }

                if (qtyChanged) {
                    await fetch(`/api/components-parts/update-quantity`, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        credentials: "include",
                        body: JSON.stringify({
                            componentId: component.id,
                            partId: p.partId,
                            quantity: newQty
                        })
                    });
                }
            }

            modal.style.display = "none";
            await loadStructure();

        } catch (err) {
            console.error(err);
            alert("Грешка при запис");
        }
    };

    content.appendChild(saveBtn);

    // 👉 CLOSE
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Затвори";
    closeBtn.style.marginLeft = "10px";

    closeBtn.onclick = () => modal.style.display = "none";

    content.appendChild(closeBtn);
}

function closeModal(element) {
    const modal = element.closest(".modal");
    modal.style.display = "none";
}

// 👉 expose към HTML
window.openEntityModal = openEntityModal;
window.openAddPartToComponent = openAddPartToComponent;
window.openEditComponentModal = openEditComponentModal;
window.closeModal = closeModal;
window.handleSubmit = handleSubmit;

