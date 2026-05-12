import {getStructure} from "../service/structureService.js";
import {getPartsByComponentId} from "../api/componentsPartsApi.js";

const container = document.getElementById("structure-container");

const machineName =
    new URLSearchParams(window.location.search).get("name");

document.addEventListener("DOMContentLoaded", () => {

    if (container) {
        loadStructure();
    }
});

// =========================
// LOAD STRUCTURE
// =========================

export async function loadStructure() {

    const devices =
        await getStructure(machineName);

    container.innerHTML = "";

    // =========================
    // TITLE
    // =========================

    const title = document.createElement("h1");

    title.textContent = machineName;

    container.appendChild(title);

    // =========================
    // TABLE
    // =========================

    const table = document.createElement("table");

    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    table.appendChild(createHeader());

    // =========================
    // DEVICES
    // =========================

    for (const device of devices) {

        const subDevices = device.subDevices || [];

        // =========================
        // NO SUBDEVICES
        // =========================

        if (!subDevices.length) {

            const row = document.createElement("tr");

            row.appendChild(createCell(device.name));
            row.appendChild(createCell("-"));
            row.appendChild(createCell("-"));
            row.appendChild(createCell("-"));

            table.appendChild(row);

            continue;
        }

        // =========================
        // SUBDEVICES
        // =========================

        for (const sd of subDevices) {

            const components = sd.components || [];

            // =========================
            // NO COMPONENTS
            // =========================

            if (!components.length) {

                const row = document.createElement("tr");

                row.appendChild(createCell(device.name));
                row.appendChild(createCell(sd.name));
                row.appendChild(createCell("-"));
                row.appendChild(createCell("-"));

                table.appendChild(row);

                continue;
            }

            // =========================
            // COMPONENTS
            // =========================

            for (const component of components) {

                const parts =
                    await getPartsByComponentId(component.id) || [];

                // =========================
                // NO PARTS
                // =========================

                if (!parts.length) {

                    const row = document.createElement("tr");

                    row.appendChild(createCell(device.name));
                    row.appendChild(createCell(sd.name));
                    row.appendChild(createCell(component.name));
                    row.appendChild(createCell("-"));

                    table.appendChild(row);

                    continue;
                }

                // =========================
                // PARTS
                // =========================

                for (const part of parts) {

                    const row = document.createElement("tr");

                    row.appendChild(createCell(device.name));
                    row.appendChild(createCell(sd.name));
                    row.appendChild(createCell(component.name));
                    row.appendChild(createCell(part.name));

                    table.appendChild(row);
                }
            }
        }
    }

    container.appendChild(table);
}

// =========================
// HEADER
// =========================

function createHeader() {

    const tr = document.createElement("tr");

    const headers = [
        "Устройство",
        "Подустройство",
        "Компонент",
        "Част"
    ];

    headers.forEach(text => {

        const th = document.createElement("th");

        th.textContent = text;

        th.style.border = "1px solid #ccc";
        th.style.padding = "10px";
        th.style.background = "#1b6bff";
        th.style.color = "white";
        th.style.textAlign = "center";

        tr.appendChild(th);
    });

    return tr;
}

// =========================
// CELL
// =========================

function createCell(text) {

    const td = document.createElement("td");

    td.textContent = text || "-";

    style(td);

    return td;
}

// =========================
// STYLE
// =========================

function style(td) {

    td.style.border = "1px solid #ccc";
    td.style.padding = "8px";
    td.style.textAlign = "center";
}

window.reloadPageStructure = loadStructure;