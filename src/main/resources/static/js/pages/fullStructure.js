import { getFullStructure } from "../api/machinesApi.js";
import { openAddPartToComponent } from "../ui/modal.js";
import { getPartsByComponentId } from "../api/componentsPartsApi.js";

const container = document.getElementById("structure-container");

// 👉 machineName от URL
const params = new URLSearchParams(window.location.search);
const machineName = params.get("name");

document.addEventListener("DOMContentLoaded", () => {
    if (container) {
        loadStructure().then(() => console.log("Structure loaded"));
    }
});

export async function loadStructure() {
    console.log("Machine:", machineName);

    const data = await getFullStructure(machineName);
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

    for (const device of devices) {

        if (!device.subDevices || !device.subDevices.length) {
            const row = document.createElement("tr");
            row.appendChild(createCell(device.name));
            row.appendChild(createCell("-"));
            row.appendChild(createCell("-"));
            row.appendChild(createCell("-"));
            table.appendChild(row);
            continue;
        }

        for (const sd of device.subDevices) {

            if (!sd.components || !sd.components.length) {
                const row = document.createElement("tr");
                row.appendChild(createCell(device.name));
                row.appendChild(createCell(sd.name));
                row.appendChild(createCell("-"));
                row.appendChild(createCell("-"));
                table.appendChild(row);
                continue;
            }

            for (const c of sd.components) {

                const parts = await getPartsByComponentId(c.id);

                // 👉 НЯМА ЧАСТИ
                if (!parts || parts.length === 0) {
                    const row = document.createElement("tr");

                    row.appendChild(createCell(device.name));
                    row.appendChild(createCell(sd.name));
                    row.appendChild(createComponentCell(c));
                    row.appendChild(createCell("-"));

                    table.appendChild(row);
                } else {
                    // 👉 ИМА ЧАСТИ
                    parts.forEach((cp, index) => {
                        const row = document.createElement("tr");

                        if (index === 0) {
                            const deviceCell = createCell(device.name);
                            deviceCell.rowSpan = parts.length;

                            const sdCell = createCell(sd.name);
                            sdCell.rowSpan = parts.length;

                            const compCell = createComponentCell(c);
                            compCell.rowSpan = parts.length;

                            row.appendChild(deviceCell);
                            row.appendChild(sdCell);
                            row.appendChild(compCell);

                            if (parts.length > 0) {
                                deviceCell.style.borderBottom = "3px solid #1b6bff";
                                sdCell.style.borderBottom = "3px solid #1b6bff";
                                compCell.style.borderBottom = "3px solid #1b6bff";
                            }
                        }

                        // 👉 част
                        const partCell = createCell(
                            `${index + 1}. ${cp.partName} - ${cp.description}`
                        );

                        const details = document.createElement("div");
                        details.style.fontSize = "12px";
                        details.style.color = "gray";
                        details.textContent = ` ${cp.quantity} бр. | SAP: ${cp.sapNumber}`;

                        partCell.appendChild(document.createElement("br"));
                        partCell.appendChild(details);

                        row.appendChild(partCell);
                        table.appendChild(row);

                        if (index === parts.length - 1) {
                            Array.from(row.children).forEach(td => {
                                td.style.borderBottom = "3px solid #1b6bff";
                            });
                        }
                    });
                }
            }
        }
    }

    container.appendChild(table);
}

// 👉 cell за компонент (име + бутон)
function createComponentCell(component) {
    const td = document.createElement("td");

    const nameDiv = document.createElement("div");
    nameDiv.textContent = component.name;

    const addBtn = document.createElement("button");
    addBtn.textContent = "Добави част";
    addBtn.className = "button-click";

    addBtn.style.fontSize = "12px";
    addBtn.style.padding = "3px 6px";
    addBtn.style.marginTop = "5px";

    addBtn.onclick = () => openAddPartToComponent(component.id);

    td.appendChild(nameDiv);
    td.appendChild(addBtn);

    td.style.border = "1px solid #ccc";
    td.style.padding = "8px";
    td.style.textAlign = "center";

    return td;
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