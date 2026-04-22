import {loadDevices, loadSubDevicesByDevice} from "./selectLoader.js";
import {addPart, addPartToComponent} from "../api/partsApi.js";
import {loadStructure} from "../pages/fullStructure.js";
import {submitEntity} from "../ui/entityHandler.js";


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
    const sapNumberInput = document.getElementById("sap-number-input");

    modal.style.display = "flex";
    selectDevice.innerHTML = "";
    extraInfoContainer.style.display = "none";
    extraInfoInput.value = "";
    selectDevice.style.display = "none";
    selectSubDevice.style.display = "none";
    partExtraFields.style.display = "none";
    sapNumberInput.value = "";

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

export function openAddPartToComponent(componentId) {
    currentComponentId = componentId;

    openEntityModal("part");

    // 👉 когато се създаде част → я връзваме към component
    triggerPartCreated(async (newPart) => {
        console.log("New part created, linking to component...", newPart)
        const qtyInput = document.getElementById("part-quantity-input");
        const qty = parseInt(qtyInput.value) || 0;
        await addPartToComponent(currentComponentId, newPart.id, qty);

        await loadStructure();
    }).then(r => console.log("Callback for part created set"));
}

function closeModal(element) {
    const modal = element.closest(".modal");
    modal.style.display = "none";
}

// 👉 expose към HTML
window.openEntityModal = openEntityModal;
window.openAddPartToComponent = openAddPartToComponent;
window.closeModal = closeModal;
window.handleSubmit = handleSubmit;

