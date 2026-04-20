import {loadDevices, loadSubDevicesByDevice} from "./selectLoader.js";
import {addPartToComponent} from "../api/partsApi.js";
import {loadStructure} from "../pages/fullStructure.js";
import {getAllParts} from "../api/partsApi.js";



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

        selectContainer.style.display = "none"; // ❗ ключово
        partExtraFields.style.display = "block";
    }


    document.getElementById("entity-name-input").value = "";
    document.getElementById("entity-message").innerText = "";

}

let onPartCreatedCallback = null;

export function setOnPartCreatedCallback(cb) {
    onPartCreatedCallback = cb;
}

export async function triggerPartCreated(newPart) {
    if (onPartCreatedCallback) {
        onPartCreatedCallback(newPart);
        onPartCreatedCallback = null;
    }
}


let currentComponentId = null;

export async function openAddPartToComponent(componentId) {

        currentComponentId = componentId;

        const modal = document.getElementById("add-entity-modal");
        modal.style.display = "flex";

        await renderPartSelector(componentId); // ✔ достатъчно

    const title = document.getElementById("modal-title");
    const selectContainer = document.getElementById("relation-select-container");
    const partExtraFields = document.getElementById("part-extra-fields");

    title.innerText = "Добави част към компонент";

    selectContainer.style.display = "none";
    partExtraFields.style.display = "none";

}
async function renderPartSelector(componentId) {
    const container = document.getElementById("extra-info-container");
    container.style.display = "block";
    container.innerHTML = "";

    const parts = await getAllParts();

    const select = document.createElement("select");

    parts.forEach(p => {
        const option = document.createElement("option");
        option.value = p.id;
        option.textContent = `${p.partName} (${p.description})`;
        select.appendChild(option);
    });

    // 👉 опция за нова част
    const newOption = document.createElement("option");
    newOption.value = "new";
    newOption.textContent = "➕ Добави нова част";
    select.appendChild(newOption);

    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.placeholder = "бр.";

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Запази";
    saveBtn.className = "button-click";

    saveBtn.onclick = async () => {
        if (select.value === "new") {
            openEntityModal("part");

            // 👉 след създаване → добавяме към component
            setOnPartCreatedCallback(async (newPart) => {
                await addPartToComponent(componentId, newPart.id, qtyInput.value);
                await loadStructure();
            });

            return;
        }

        await addPartToComponent(componentId, select.value, qtyInput.value);
        await loadStructure();
    };

    container.appendChild(select);
    container.appendChild(qtyInput);
    container.appendChild(saveBtn);
}


function closeModal(element) {
    const modal = element.closest(".modal");
    modal.style.display = "none";
}

// 👉 expose към HTML
window.openEntityModal = openEntityModal;
window.openAddPartToComponent = openAddPartToComponent;
window.closeModal = closeModal;


