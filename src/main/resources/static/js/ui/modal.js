import {loadDevices, loadSubDevicesByDevice} from "./selectLoader.js";
import {getFullStructure} from "../api/machine-detailsApi.js";

export function openFullStructureModal() {
    const modal = document.getElementById("devices-modal");
    const container = document.getElementById("devices-container");

    modal.style.display = "block";
    container.innerHTML = "<p>Зареждане...</p>";

    const params = new URLSearchParams(window.location.search);
    const machineName = params.get("name");

    getFullStructure(machineName).then(data => {

        const devices = data.structure;

        if (!devices || !devices.length) {
            container.innerHTML = "<p>Няма данни</p>";
            return;
        }

        container.innerHTML = machineName;

        const table = document.createElement("table");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.marginTop = "10px";

// Header
        const headerRow = document.createElement("tr");

        ["Устройство", "Подустройство", "Компонент"].forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            th.style.border = "1px solid #ccc";
            th.style.padding = "8px";
            th.style.background = "#1b6bff";
            th.style.color = "white";
            headerRow.appendChild(th);
        });

        table.appendChild(headerRow);
        container.appendChild(table);

        devices.forEach(device => {

            // ако няма subDevices
            if (!device.subDevices || !device.subDevices.length) {
                const row = document.createElement("tr");

                row.appendChild(createCell(device.name));
                row.appendChild(createCell("-"));
                row.appendChild(createCell("-"));

                table.appendChild(row);
                return;
            }

            device.subDevices.forEach(sd => {

                // ако няма компоненти
                if (!sd.components || !sd.components.length) {
                    const row = document.createElement("tr");

                    row.appendChild(createCell(device.name));
                    row.appendChild(createCell(sd.name));
                    row.appendChild(createCell("-"));

                    table.appendChild(row);
                    return;
                }

                sd.components.forEach(c => {
                    const row = document.createElement("tr");

                    row.appendChild(createCell(device.name));
                    row.appendChild(createCell(sd.name));
                    row.appendChild(createCell(c.name));

                    table.appendChild(row);
                });

            });


        });

        function createCell(text) {
            const td = document.createElement("td");
            td.textContent = text;
            td.style.border = "1px solid #ccc";
            td.style.padding = "8px";
            td.style.textAlign = "center";
            return td;
        }
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

        const deviceSelect = document.getElementById("devices-select");
        const subDeviceSelect = document.getElementById("subDevices-select");

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

            subDeviceSelect.innerHTML = "<option>Зареждане...</option>";
            loadSubDevicesByDevice(subDeviceSelect, selectDevice.value);
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
window.openFullStructureModal = openFullStructureModal;
window.openEntityModal = openEntityModal;
window.closeModal = closeModal;


