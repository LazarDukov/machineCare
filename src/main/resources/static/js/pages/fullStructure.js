import {getFullStructure} from "../api/machinesApi.js";
import {showAddPartRow} from "../ui/modal.js";

const container = document.getElementById("structure-container");

// 👉 взимаме machineName от URL
const params = new URLSearchParams(window.location.search);
const machineName = params.get("name");


document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("structure-container");
    if (container) {
        loadStructure();
    }
});
//TODO: should check why it goes in this method !
export function loadStructure() {

    console.log("Machine:", machineName);

    getFullStructure(machineName).then(data => {

        const devices = data.structure;

        if (!devices || !devices.length) {
            container.innerHTML = "<p>Няма данни</p>";
            return;
        }

        // Заглавие
        const title = document.createElement("h1");
        title.textContent = machineName;
        container.innerHTML = "";
        container.appendChild(title);

        const table = document.createElement("table");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.marginTop = "10px";

        // Header
        const headerRow = document.createElement("tr");

        ["Устройство", "Подустройство", "Компонент", "Част"].forEach(text => {
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

            if (!device.subDevices || !device.subDevices.length) {
                const row = document.createElement("tr");

                row.appendChild(createCell(device.name));
                row.appendChild(createCell("-"));
                row.appendChild(createCell("-"));
                row.appendChild(createCell("-"));

                table.appendChild(row);
                return;
            }

            device.subDevices.forEach(sd => {

                if (!sd.components || !sd.components.length) {
                    const row = document.createElement("tr");

                    row.appendChild(createCell(device.name));
                    row.appendChild(createCell(sd.name));
                    row.appendChild(createCell("-"));
                    row.appendChild(createCell("-"));

                    table.appendChild(row);
                    return;
                }

                sd.components.forEach(c => {

                    if (!c.parts || !c.parts.length) {
                        const row = document.createElement("tr");

                        row.appendChild(createCell(device.name));
                        row.appendChild(createCell(sd.name));
                        row.appendChild(createCell(c.name));

                        // 👉 клетка с бутон
                        const actionCell = document.createElement("td");

                        const btn = document.createElement("button");
                        btn.textContent = "Добави";
                        btn.className = "button-click";

                        btn.onclick = () => {
                            showAddPartRow(row, c.id).then();
                        };

                        actionCell.appendChild(btn);
                        row.appendChild(actionCell);

                        table.appendChild(row);
                        return;
                    }

                    // 👉 ТУК беше големият проблем – липсваше loop за parts
                    c.parts.forEach(p => {
                        const row = document.createElement("tr");

                        row.appendChild(createCell(device.name));
                        row.appendChild(createCell(sd.name));
                        row.appendChild(createCell(c.name));
                        row.appendChild(createCell(p.part?.partName || "-"));

                        table.appendChild(row);
                    });

                });

            });

        });

        container.appendChild(table);
    });
}

// helper
function createCell(text) {
    const td = document.createElement("td");
    td.textContent = text || "-";
    td.style.border = "1px solid #ccc";
    td.style.padding = "8px";
    td.style.textAlign = "center";
    return td;
}