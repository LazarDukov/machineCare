import {getFullStructure} from "../api/machine-detailsApi.js";

const container = document.getElementById("structure-container");

// 👉 взимаме machineName от URL
const params = new URLSearchParams(window.location.search);
const machineName = params.get("name");

loadStructure();

function loadStructure() {

    console.log("Machine:", machineName);

    getFullStructure(machineName).then(data => {

        const devices = data.structure;

        if (!devices || !devices.length) {
            container.innerHTML = "<p>Няма данни</p>";
            return;
        }

        // Заглавие с име на машината
        const title = document.createElement("h2");
        title.textContent = machineName;
        container.innerHTML = "";
        container.appendChild(title);

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

        devices.forEach(device => {

            // няма subDevices
            if (!device.subDevices || !device.subDevices.length) {
                const row = document.createElement("tr");

                row.appendChild(createCell(device.name));
                row.appendChild(createCell("-"));
                row.appendChild(createCell("-"));

                table.appendChild(row);
                return;
            }

            device.subDevices.forEach(sd => {

                // няма компоненти
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

        container.appendChild(table);
    });
}

function createCell(text) {
    const td = document.createElement("td");
    td.textContent = text || "-";
    td.style.border = "1px solid #ccc";
    td.style.padding = "8px";
    td.style.textAlign = "center";
    return td;
}