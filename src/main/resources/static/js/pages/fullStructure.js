import {getFullStructure} from "../api/machinesApi.js";
import {openAddPartToComponent} from "../ui/modal.js";
import {getPartsByComponentId} from "../api/componentsPartsApi.js";

const container = document.getElementById("structure-container");

// 👉 взимаме machineName от URL
const params = new URLSearchParams(window.location.search);
const machineName = params.get("name");


document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("structure-container");
    if (container) {
        loadStructure().then(r => console.log("Structure loaded"));
    }
});

//TODO: should check why it goes in this method !


export async function loadStructure() {
    console.log("Machine:", machineName);

    const data = await getFullStructure(machineName); // ✅ тук трябва да е

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
            return;
        }

        for (const sd of device.subDevices) {

            if (!sd.components || !sd.components.length) {
                const row = document.createElement("tr");

                row.appendChild(createCell(device.name));
                row.appendChild(createCell(sd.name));
                row.appendChild(createCell("-"));
                row.appendChild(createCell("-"));

                table.appendChild(row);
                return;
            }

            for (const c of sd.components) {

                const parts = await getPartsByComponentId(c.id);

                console.log(`Component: ${c.name}, Parts:`, parts, `(Component ID: ${c.id})`);
                console.log(parts.length)
                // 👉 ако няма части
                if (parts.length === 0) {
                    const row = document.createElement("tr");

                    row.appendChild(createCell(device.name));
                    row.appendChild(createCell(sd.name));
                    row.appendChild(createCell(c.name));
                    row.appendChild(createCell("-"));

                    const actionCell = document.createElement("td");

                    const btn = document.createElement("button");
                    btn.textContent = "Добави";
                    btn.className = "button-click";

                    btn.onclick = () => {
                        openAddPartToComponent(c.id);
                    };

                    actionCell.appendChild(btn);
                    row.appendChild(actionCell);

                    table.appendChild(row);

                } else {
                    // 👉 има части
                    if (parts.length === 0) {
                        const row = document.createElement("tr");

                        row.appendChild(createCell(device.name));
                        row.appendChild(createCell(sd.name));
                        row.appendChild(createCell(c.name));
                        row.appendChild(createCell("-"));

                        table.appendChild(row);

                    } else {
                        parts.forEach((cp, index) => {
                            const row = document.createElement("tr");

                            // 👉 само при първия ред добавяме device/subDevice/component
                            if (index === 0) {
                                const deviceCell = createCell(device.name);
                                deviceCell.rowSpan = parts.length;
                                row.appendChild(deviceCell);

                                const sdCell = createCell(sd.name);
                                sdCell.rowSpan = parts.length;
                                row.appendChild(sdCell);

                                const compCell = createCell();

                                const nameDiv = document.createElement("div");
                                nameDiv.textContent = c.name;


                                const addBtn = document.createElement("button");
                                addBtn.textContent = "Добави част";
                                addBtn.className = "button-click";

// 👇 по-малък бутон
                                addBtn.style.fontSize = "12px";
                                addBtn.style.padding = "3px 6px";
                                addBtn.style.marginTop = "5px";

                                addBtn.onclick = () => {
                                    // намираме първия ред на компонента
                                    const row = compCell.parentElement;
                                    openAddPartToComponent(c.id);
                                };

                                compCell.appendChild(nameDiv);
                                compCell.appendChild(addBtn);
                                compCell.rowSpan = parts.length;
                                row.appendChild(compCell);

                                if (parts.length > 0) {
                                    deviceCell.style.borderBottom = "3px solid #1b6bff";
                                    sdCell.style.borderBottom = "3px solid #1b6bff";
                                    compCell.style.borderBottom = "3px solid #1b6bff";
                                }

                            }
                            // 👉 частта винаги се добавя
                            console.log(cp.quantity);

                            const partCell = createCell(
                                `${index + 1}. ${cp.partName} (${cp.quantity} бр.)`
                            );

                            const details = document.createElement("div");
                            details.style.fontSize = "12px";
                            details.style.color = "gray";
                            details.textContent = `SAP: ${cp.sapNumber} | ${cp.description}`;

                            partCell.appendChild(document.createElement("br"));
                            partCell.appendChild(details);

                            row.appendChild(partCell);
                            console.log("CP OBJECT:", cp);
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

    }

    container.appendChild(table);

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