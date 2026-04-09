import {loadDevices, loadSubDevicesByDevice} from "./selectLoader.js";
import {getDevices} from "../api/devicesApi.js";
import {getSubDevicesByDeviceId} from "../api/subDevicesApi.js";
import {getComponentsBySubDeviceId} from "../api/componentApi.js";
import { getFullStructure } from "../api/machine-detailsApi.js";

export function openFullStructureModal() {
    const modal = document.getElementById("devices-modal");
    const container = document.getElementById("devices-container");

    modal.style.display = "block";
    container.innerHTML = "<p>Зареждане...</p>";

    const params = new URLSearchParams(window.location.search);
    const machineName = params.get("name");

    getFullStructure(machineName).then(devices => {

        if (!devices.length) {
            container.innerHTML = "<p>Няма данни</p>";
            return;
        }

        container.innerHTML = "Структура";

        devices.forEach(device => {

            // 🔹 DEVICE
            const deviceDiv = document.createElement("div");
            deviceDiv.textContent = device.name;

            deviceDiv.style.padding = "10px";
            deviceDiv.style.background = "#ddd";
            deviceDiv.style.borderRadius = "8px";
            deviceDiv.style.marginTop = "10px";

            container.appendChild(deviceDiv);

            // 🔹 SUB DEVICES
            if (!device.subDevices || !device.subDevices.length) return;

            device.subDevices.forEach(sd => {

                const subDiv = document.createElement("div");
                subDiv.textContent = sd.name;

                subDiv.style.padding = "10px";
                subDiv.style.background = "#f5f5f5";
                subDiv.style.borderRadius = "6px";
                subDiv.style.marginTop = "5px";
                subDiv.style.marginLeft = "20px";
                subDiv.style.width = "70%";

                container.appendChild(subDiv);

                // 🔹 COMPONENTS
                if (!sd.components || !sd.components.length) return;

                sd.components.forEach(c => {

                    const compDiv = document.createElement("div");
                    compDiv.textContent = c.name;

                    compDiv.style.padding = "8px";
                    compDiv.style.background = "#fff";
                    compDiv.style.border = "1px solid #ddd";
                    compDiv.style.borderRadius = "6px";
                    compDiv.style.marginTop = "4px";
                    compDiv.style.marginLeft = "40px";
                    compDiv.style.width = "60%";

                    container.appendChild(compDiv);
                });

            });

        });

    }).catch(err => {
        console.error(err);
        container.innerHTML = "<p style='color:red;'>Грешка</p>";
    });
}

// export function openDevicesModal() {
//     const modal = document.getElementById("devices-modal");
//     const container = document.getElementById("devices-container");
//
//     modal.style.display = "block";
//     container.innerHTML = "<p>Зареждане...</p>";
//
//     const params = new URLSearchParams(window.location.search);
//     const machineName = params.get("name");
//
//     getDevices(machineName).then(devices => {
//
//         if (!devices.length) {
//             container.innerHTML = "<p>Няма добавени устройства</p>";
//             return;
//         }
//
//         container.innerHTML = "Устройства";
//
//         devices.forEach(device => {
//             const div = document.createElement("div");
//             div.textContent = device.name;
//             div.style.padding = "10px";
//             div.style.background = "#11658d";
//             div.style.borderRadius = "8px";
//
//             container.appendChild(div);
//         });
//
//     }).catch(() => {
//         container.innerHTML = "<p style='color:red;'>Грешка</p>";
//     });
// }

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

//
// export function openSubDevicesModal() {
//     const modal = document.getElementById("devices-modal");
//     const container = document.getElementById("devices-container");
//
//     modal.style.display = "block";
//     container.innerHTML = "<p>Зареждане...</p>";
//
//     const params = new URLSearchParams(window.location.search);
//     const machineName = params.get("name");
//
//     getDevices(machineName).then(devices => {
//
//         if (!devices.length) {
//             container.innerHTML = "<p>Няма устройства</p>";
//             return;
//         }
//
//         container.innerHTML = "Подустройства";
//
//         devices.forEach(device => {
//
//             // 🔹 УСТРОЙСТВО
//             const deviceDiv = document.createElement("div");
//             deviceDiv.textContent = device.name;
//
//             deviceDiv.style.padding = "10px";
//             deviceDiv.style.background = "#11658DFF";
//             deviceDiv.style.borderRadius = "8px";
//             deviceDiv.style.marginTop = "10px";
//
//             container.appendChild(deviceDiv);
//
//             // 🔹 контейнер за подустройства
//             const subContainer = document.createElement("div");
//             subContainer.style.display = "flex";
//             subContainer.style.flexDirection = "column";
//             subContainer.style.alignItems = "center";
//             subContainer.innerHTML = "<p>Зареждане...</p>";
//
//             container.appendChild(subContainer);
//
//             // 🔽 зареждаме подустройства
//             getSubDevicesByDeviceId(device.id).then(subDevices => {
//
//                 if (!subDevices.length) {
//                     subContainer.innerHTML = "<p style='font-size:12px;'>Няма подустройства</p>";
//                     return;
//                 }
//
//                 subContainer.innerHTML = "";
//
//                 subDevices.forEach(sd => {
//                     const subDiv = document.createElement("div");
//
//                     subDiv.textContent = sd.name;
//
//                     // 👇 по-тясно и различимо
//                     subDiv.style.padding = "10px";
//                     subDiv.style.background = "#59cdff";
//                     subDiv.style.borderRadius = "6px";
//                     subDiv.style.marginTop = "5px";
//                     subDiv.style.width = "auto";
//                     subDiv.style.textAlign = "center";
//                     subDiv.style.fontSize = "14px";
//
//                     subContainer.appendChild(subDiv);
//                 });
//
//             });
//
//         });
//
//     }).catch(err => {
//         console.error(err);
//         container.innerHTML = "<p style='color:red;'>Грешка</p>";
//     });
// }

// export function openMachineStructureModal() {
//     const modal = document.getElementById("devices-modal");
//     const container = document.getElementById("devices-container");
//
//     modal.style.display = "block";
//     container.innerHTML = "<p>Зареждане...</p>";
//
//     const params = new URLSearchParams(window.location.search);
//     const machineName = params.get("name");
//
//     getDevices(machineName).then(devices => {
//
//         if (!devices.length) {
//             container.innerHTML = "<p>Няма устройства</p>";
//             return;
//         }
//
//         container.innerHTML = "Компоненти";
//
//         devices.forEach(device => {
//
//             // 🔹 УСТРОЙСТВО
//             const deviceDiv = document.createElement("div");
//             deviceDiv.textContent = device.name;
//
//             deviceDiv.style.padding = "10px";
//             deviceDiv.style.background = "#11658DFF";
//             deviceDiv.style.borderRadius = "8px";
//             deviceDiv.style.marginTop = "10px";
//
//             container.appendChild(deviceDiv);
//
//             // 🔹 контейнер за подустройства
//             const subContainer = document.createElement("div");
//             subContainer.style.display = "flex";
//             subContainer.style.flexDirection = "column";
//             subContainer.style.alignItems = "center";
//             subContainer.innerHTML = "<p>Зареждане...</p>";
//
//             container.appendChild(subContainer);
//
//             // 🔽 зареждаме подустройства
//             getSubDevicesByDeviceId(device.id).then(subDevices => {
//
//                 if (!subDevices.length) {
//                     subContainer.innerHTML = "<p style='font-size:12px;'>Няма подустройства</p>";
//                     return;
//                 }
//
//                 subContainer.innerHTML = "";
//
//                 subDevices.forEach(sd => {
//
//                     // 🔹 ПОДУСТРОЙСТВО
//                     const subDiv = document.createElement("div");
//                     subDiv.textContent = sd.name;
//
//                     subDiv.style.padding = "10px";
//                     subDiv.style.background = "#59cdff";
//                     subDiv.style.borderRadius = "6px";
//                     subDiv.style.marginTop = "5px";
//                     subDiv.style.width = "auto";
//                     subDiv.style.textAlign = "center";
//                     subDiv.style.fontSize = "14px";
//
//                     subContainer.appendChild(subDiv);
//
//                     // 🔹 контейнер за компоненти
//                     const compContainer = document.createElement("div");
//                     compContainer.style.display = "flex";
//                     compContainer.style.flexDirection = "column";
//                     compContainer.style.alignItems = "center";
//                     compContainer.innerHTML = "<p style='font-size:12px;'>Зареждане...</p>";
//
//                     subContainer.appendChild(compContainer);
//
//                     // 🔽 зареждаме компоненти
//                     getComponentsBySubDeviceId(sd.id).then(components => {
//
//                         if (!components.length) {
//                             compContainer.innerHTML = "<p style='font-size:12px;'>Няма компоненти</p>";
//                             return;
//                         }
//
//                         compContainer.innerHTML = "";
//
//                         components.forEach(c => {
//                             const compDiv = document.createElement("div");
//
//                             compDiv.textContent = c.name;
//
//                             // 👇 още по-тясно за йерархия
//                             compDiv.style.padding = "8px";
//                             compDiv.style.background = "#c2efff";
//                             compDiv.style.border = "1px solid #ddd";
//                             compDiv.style.borderRadius = "6px";
//                             compDiv.style.marginTop = "4px";
//                             compDiv.style.width = "auto";
//                             compDiv.style.textAlign = "center";
//                             compDiv.style.fontSize = "13px";
//
//                             compContainer.appendChild(compDiv);
//                         });
//
//                     });
//
//                 });
//
//             });
//
//         });
//
//     }).catch(err => {
//         console.error(err);
//         container.innerHTML = "<p style='color:red;'>Грешка</p>";
//     });
// }

function closeModal(element) {
    const modal = element.closest(".modal");
    modal.style.display = "none";
}

// 👉 expose към HTML
// window.openDevicesModal = openDevicesModal;
// window.openSubDevicesModal = openSubDevicesModal;
// window.openComponentsModal = openComponentsModal;
window.openFullStructureModal = openFullStructureModal;
window.openEntityModal = openEntityModal;
window.closeModal = closeModal;

