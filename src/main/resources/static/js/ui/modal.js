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
window.openFullStructureModal = openFullStructureModal;
window.openEntityModal = openEntityModal;
window.closeModal = closeModal;


