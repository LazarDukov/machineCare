import {getStructure} from "../service/structureService.js";
import {getPartsByComponentId} from "../api/componentsPartsApi.js";
import {openPartImages} from "../ui/modals.js";
import {openComponentImages} from "../ui/modals.js";


const machineName =
    new URLSearchParams(window.location.search)
        .get("name");

// =========================
// INIT
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const pageTitle =
        document.getElementById("page-title");

    if (machineName && pageTitle) {

        pageTitle.textContent =
            `Структура на ${machineName}`;
    }

    loadStructure();
});

// =========================
// LOAD STRUCTURE
// =========================

async function loadStructure() {

    try {

        const devices =
            await getStructure(machineName);

        const container =
            document.getElementById("structure-container");

        if (!container) {
            console.error("Missing #structure-container");
            return;
        }

        const table =
            document.createElement("table");
        table.className = "structure-table";


        table.appendChild(createHeader());

        // =========================
        // DEVICES
        // =========================

        for (const device of devices) {

            const subDevices =
                device.subDevices || [];

            // =========================
            // NO SUBDEVICES
            // =========================

            if (!subDevices.length) {

                appendRow(
                    table,
                    device.name,
                    "-",
                    "-",
                    "-"
                );

                continue;
            }

            // =========================
            // SUBDEVICES
            // =========================

            for (const subDevice of subDevices) {

                const components =
                    subDevice.components || [];

                // =========================
                // NO COMPONENTS
                // =========================

                if (!components.length) {

                    appendRow(
                        table,
                        device.name,
                        subDevice.name,
                        "-",
                        "-"
                    );

                    continue;
                }

                // =========================
                // COMPONENTS
                // =========================

                for (const component of components) {
                    console.log("VIJ SQ: " + component.id, component.name, component.brand, component.model);
                    const parts =
                        await getPartsByComponentId(component.id) || [];

                    console.log("PARTS:", parts);

                    // =========================
                    // NO PARTS
                    // =========================

                    if (!parts.length) {

                        appendRow(
                            table,
                            device.name,
                            subDevice.name,
                            createComponentCell(component),
                            "-"
                        );

                        continue;
                    }

                    // =========================
                    // PARTS
                    // =========================

                    for (const part of parts) {

                        appendRow(
                            table,
                            device.name,
                            subDevice.name,
                            createComponentCell(component),
                            createPartCell(part)
                        );
                    }
                }
            }
        }

        container.appendChild(table);

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <p style="color:red;">
                Грешка при зареждане на структурата.
            </p>
        `;
    }
}

// =========================
// HEADER
// =========================

function createHeader() {

    const tr =
        document.createElement("tr");

    const headers = [
        "Устройство",
        "Подустройство",
        "Компонент",
        "Част"
    ];

    headers.forEach(text => {

        const th =
            document.createElement("th");

        th.textContent = text;


        tr.appendChild(th);
    });

    return tr;
}

// =========================
// APPEND ROW
// =========================

function appendRow(table, device, subDevice, componentCell, partCell) {
    const tr = document.createElement("tr");

    tr.appendChild(createCell(device));
    tr.appendChild(createCell(subDevice));

    if (componentCell instanceof HTMLElement) {
        tr.appendChild(componentCell);
    } else {
        tr.appendChild(createCell(componentCell));
    }

    if (partCell instanceof HTMLElement) {
        tr.appendChild(partCell);
    } else {
        tr.appendChild(createCell(partCell));
    }

    table.appendChild(tr);
}

// =========================
// DEFAULT CELL
// =========================

function createCell(text) {

    const td =
        document.createElement("td");

    td.textContent = text || "-";


    return td;
}

// =========================
// PART CELL
// =========================

function createComponentCell(component) {
    const td = document.createElement("td");
    console.log("Creating component cell for:", component)

    td.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 8px;">
            ${component.name || "-"}
        </div>
    
            <div>
                <strong>Марка:</strong>
                ${component.brand || "-"}

            </div>

            <div>
                <strong>Модел:</strong>
                ${component.model || "-"}
            </div>
            <div>
                <strong>Описание:</strong>
                ${component.additionalInfo || "-"}
            </div>
        <button class="component-image-btn-view">
          📷 Снимки на този компонент
        </button>
    `;

    td.querySelector(".component-image-btn-view")
        .addEventListener("click", () => {
            openComponentImages(component.id);
        });

    return td;
}

function createPartCell(part) {

    const td =
        document.createElement("td");


    td.innerHTML = `
        <div style="
            font-weight: bold;
            font-size: 15px;
            margin-bottom: 10px;
            color: #1b1b1b;
        ">
            ${part.partId || "-"}. ${part.partName || "-"}
        </div>

        <div style="
            font-size: 13px;
            color: #555;
            line-height: 1.7;
        ">

            <div>
                <strong>Марка:</strong>
                ${part.brand || "-"}
            </div>
<div>
                <strong>Модел:</strong>
                ${part.model || "-"}
            </div>
            <div>
                <strong>САП номер:</strong>
                ${part.sapNumber || "-"}
            </div>

            <div>
                <strong>Брой:</strong>
                ${part.quantity || "-"}
            </div>
            
 <button
    class="part-images-btn"
    onclick="openPartImages(${part.partId})"
>
    📷 Снимки на тази част
</button>
        </div>
    `;

    return td;
}

// =========================
// GLOBAL RELOAD
// =========================

window.reloadPageStructure =
    loadStructure;