import {getStructure} from "../service/structureService.js";
import {getPartsByComponentId} from "../api/componentsPartsApi.js";
import {openPartImages} from "../ui/modals.js";


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

        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.marginTop = "20px";

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
                            component.name,
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
                            component.name,
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

        th.style.border = "1px solid #ccc";
        th.style.padding = "12px";
        th.style.backgroundColor = "#1b6bff";
        th.style.color = "white";
        th.style.textAlign = "center";

        tr.appendChild(th);
    });

    return tr;
}

// =========================
// APPEND ROW
// =========================

function appendRow(
    table,
    device,
    subDevice,
    component,
    partCell
) {

    const tr =
        document.createElement("tr");

    tr.appendChild(createCell(device));
    tr.appendChild(createCell(subDevice));
    tr.appendChild(createCell(component));

    // =========================
    // PART CELL
    // =========================

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

    td.style.border = "1px solid #ccc";
    td.style.padding = "10px";
    td.style.textAlign = "center";
    td.style.verticalAlign = "top";

    return td;
}

// =========================
// PART CELL
// =========================

function createPartCell(part) {

    const td =
        document.createElement("td");

    td.style.border = "1px solid #ccc";
    td.style.padding = "10px";
    td.style.verticalAlign = "top";
    td.style.minWidth = "260px";

    td.innerHTML = `
        <div style="
            font-weight: bold;
            font-size: 15px;
            margin-bottom: 10px;
            color: #1b1b1b;
        ">
            ${part.partName || "-"}
        </div>

        <div style="
            font-size: 13px;
            color: #555;
            line-height: 1.7;
        ">

            <div>
                <strong>Описание:</strong>
                ${part.description || "-"}
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
    📷 Снимки
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