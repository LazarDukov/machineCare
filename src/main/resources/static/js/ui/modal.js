import {loadDevices, loadSubDevicesByDevice} from "./selectLoader.js";


export function openEntityModal(type) {
    const modal = document.getElementById("add-entity-modal");
    const title = document.getElementById("modal-title");
    const selectContainer = document.getElementById("relation-select-container");
    const selectDevice = document.getElementById("device-select");
    const selectSubDevice = document.getElementById("subDevice-select");
    const extraInfoContainer = document.getElementById("extra-info-container");
    const extraInfoInput = document.getElementById("extra-info-input");

    modal.style.display = "flex";
    selectDevice.innerHTML = "";
    extraInfoContainer.style.display = "none";
    extraInfoInput.value = "";
    selectDevice.style.display = "none";
    selectSubDevice.style.display = "none";
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


    document.getElementById("entity-name-input").value = "";
    document.getElementById("entity-message").innerText = "";

}


function closeModal(element) {
    const modal = element.closest(".modal");
    modal.style.display = "none";
}

// 👉 expose към HTML
window.openEntityModal = openEntityModal;
window.closeModal = closeModal;


