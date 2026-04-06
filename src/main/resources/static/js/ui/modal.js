import {loadDevices, loadSubDevicesByDevice} from "./selectLoader.js";
import {getDevices} from "../api/devicesApi.js";
import {getSubDevicesByDeviceId} from "../api/subDevicesApi.js";

export function openDevicesModal() {
    const modal = document.getElementById("devices-modal");
    const container = document.getElementById("devices-container");

    modal.style.display = "block";
    container.innerHTML = "<p>Зареждане...</p>";

    const params = new URLSearchParams(window.location.search);
    const machineName = params.get("name");

    getDevices(machineName).then(devices => {

        if (!devices.length) {
            container.innerHTML = "<p>Няма добавени устройства</p>";
            return;
        }

        container.innerHTML = "";

        devices.forEach(device => {
            const div = document.createElement("div");
            div.textContent = device.name;
            div.style.padding = "10px";
            div.style.background = "#eee";
            div.style.borderRadius = "8px";

            container.appendChild(div);
        });

    }).catch(() => {
        container.innerHTML = "<p style='color:red;'>Грешка</p>";
    });
}

export function openEntityModal(type) {
    const modal = document.getElementById("add-entity-modal");
    const title = document.getElementById("modal-title");
    const selectContainer = document.getElementById("relation-select-container");
    const selectDevice = document.getElementById("device-select");
    const selectSubDevice = document.getElementById("subDevice-select");

    modal.style.display = "flex";
    selectDevice.innerHTML = "";

    if (type === "device") {
        title.innerText = "Добави устройство";
        selectContainer.style.display = "none";
    }

    if (type === "subDevice") {
        title.innerText = "Добави подустройство";
        selectContainer.style.display = "block";
        loadDevices(selectDevice);
    }

    if (type === "component") {
        title.innerText = "Добави компонент";
        selectContainer.style.display = "block";

        const deviceSelect = document.getElementById("device-select");
        const subDeviceSelect = document.getElementById("subDevice-select");

        if (!selectDevice || !selectSubDevice) {
            console.error("❌ Липсват select елементи!");
            return;
        }

        // reset
        deviceSelect.innerHTML = "";
        subDeviceSelect.innerHTML = "<option>Първо избери устройство</option>";
        subDeviceSelect.disabled = true;

        // load devices
        loadDevices(selectDevice);

        deviceSelect.onchange = () => {
            const deviceId = deviceSelect.value;

            subDeviceSelect.innerHTML = "<option>Зареждане...</option>";
            loadSubDevicesByDevice(subDeviceSelect, selectDevice.value);
        };
    }

    document.getElementById("entity-name-input").value = "";
    document.getElementById("entity-message").innerText = "";
}



export function openSubDevicesModal() {
    const modal = document.getElementById("devices-modal");
    const container = document.getElementById("devices-container");

    modal.style.display = "block";
    container.innerHTML = "<p>Зареждане...</p>";

    const params = new URLSearchParams(window.location.search);
    const machineName = params.get("name");

    getDevices(machineName).then(devices => {

        if (!devices.length) {
            container.innerHTML = "<p>Няма устройства</p>";
            return;
        }

        container.innerHTML = "";

        devices.forEach(device => {

            // 🔹 УСТРОЙСТВО
            const deviceDiv = document.createElement("div");
            deviceDiv.textContent = device.name;

            deviceDiv.style.padding = "10px";
            deviceDiv.style.background = "#ddd";
            deviceDiv.style.borderRadius = "8px";
            deviceDiv.style.marginTop = "10px";

            container.appendChild(deviceDiv);

            // 🔹 контейнер за подустройства
            const subContainer = document.createElement("div");
            subContainer.style.display = "flex";
            subContainer.style.flexDirection = "column";
            subContainer.style.alignItems = "center";
            subContainer.innerHTML = "<p>Зареждане...</p>";

            container.appendChild(subContainer);

            // 🔽 зареждаме подустройства
            getSubDevicesByDeviceId(device.id).then(subDevices => {

                if (!subDevices.length) {
                    subContainer.innerHTML = "<p style='font-size:12px;'>Няма подустройства</p>";
                    return;
                }

                subContainer.innerHTML = "";

                subDevices.forEach(sd => {
                    const subDiv = document.createElement("div");

                    subDiv.textContent = sd.name;

                    // 👇 по-тясно и различимо
                    subDiv.style.padding = "10px";
                    subDiv.style.background = "#f5f5f5";
                    subDiv.style.borderRadius = "6px";
                    subDiv.style.marginTop = "5px";
                    subDiv.style.width = "60%";
                    subDiv.style.textAlign = "center";
                    subDiv.style.fontSize = "14px";

                    subContainer.appendChild(subDiv);
                });

            });

        });

    }).catch(err => {
        console.error(err);
        container.innerHTML = "<p style='color:red;'>Грешка</p>";
    });
}

function closeModal(element) {
    const modal = element.closest(".modal");
    modal.style.display = "none";
}

// 👉 expose към HTML
window.openDevicesModal = openDevicesModal;
window.openSubDevicesModal = openSubDevicesModal;
window.openEntityModal = openEntityModal;
window.closeModal = closeModal;
