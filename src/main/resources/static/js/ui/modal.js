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

export async function showAddPartRow(row, componentId) {

    const parts = await getAllParts();

    // чистим последната клетка
    const actionCell = row.children[3];
    actionCell.innerHTML = "";

    // dropdown
    const select = document.createElement("select");

    parts.forEach(p => {
        const option = document.createElement("option");
        option.value = p.id;
        option.textContent = "Част: " + p.partName + "; Тип: " + p.description;
        select.appendChild(option);
    });

    // количество
    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.placeholder = "бр.";
    qtyInput.style.width = "60px";

    // бутон save
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Запази";
    saveBtn.className = "button-click";

    saveBtn.onclick = async () => {
        const partId = select.value;
        const quantity = qtyInput.value;

        if (!quantity || quantity <= 0) {
            alert("Въведи брой!");
            return;
        }

        await addPartToComponent(componentId, partId, quantity);
        alert("Частта е добавена успешно!");
        loadStructure(); // презареждаме таблицата

    };

    // бутон cancel
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Отказ";

    cancelBtn.onclick = () => {
        loadStructure(); // връща таблицата
    };

    actionCell.appendChild(select);
    actionCell.appendChild(qtyInput);
    actionCell.appendChild(saveBtn);
    actionCell.appendChild(cancelBtn);
}


function closeModal(element) {
    const modal = element.closest(".modal");
    modal.style.display = "none";
}

// 👉 expose към HTML
window.openEntityModal = openEntityModal;
window.showAddPartRow = showAddPartRow;
window.closeModal = closeModal;


