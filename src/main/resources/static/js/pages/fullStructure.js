import {getFullStructure} from "../api/machinesApi.js";
import {getPartsByComponentId} from "../api/componentsPartsApi.js";

import {
    createCell,
    createDeviceCell,
    createSubDeviceCell,
    createComponentCell,
    createPartCell
} from "../ui/fullStructureUI.js";

import {
    openAddDeviceModal,
    openAddSubDeviceModal,
    openAddComponentModal,
    openEditComponentModal,
    openAddPartToComponent,
    openEditPart, initDeviceModal, initSubDeviceModal, initComponentModal, initChangeComponent, initPartModal, initEditPartModal
} from "../ui/modals.js";

const container = document.getElementById("structure-container");

const params = new URLSearchParams(window.location.search);
const machineName = params.get("name");

document.addEventListener("DOMContentLoaded", () => {
    if (container) loadStructure();
});

export async function loadStructure() {
    const data = await getFullStructure(machineName);
    const devices = data.structure;

    container.innerHTML = "";

    const title = document.createElement("h1");
    title.textContent = machineName;
    container.appendChild(title);

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    table.appendChild(createHeader());

    for (const device of devices) {

        const subDevices = device.subDevices || [];

        // ❗ ако няма subDevices -> показваш само ред с device + action
        if (!subDevices.length) {
            const row = document.createElement("tr");

            row.appendChild(createDeviceCell(device));

            row.appendChild(createEmptySubDeviceCell(device.id));

            row.appendChild(createCell("-"));
            row.appendChild(createCell("-"));

            table.appendChild(row);
            continue;
        }

        for (const sd of subDevices) {

            const components = sd.components || [];

            // ❗ ако няма components
            if (!components.length) {
                const row = document.createElement("tr");

                row.appendChild(createDeviceCell(device));
                row.appendChild(createSubDeviceCell(sd, openAddSubDeviceModal));

                row.appendChild(createEmptyComponentCell(sd.id));

                row.appendChild(createCell("-"));

                table.appendChild(row);
                continue;
            }

            for (const c of sd.components) {
                const parts = await getPartsByComponentId(c.id);
                const partCount = parts.length || 1;

                for (let i = 0; i < partCount; i++) {

                    const row = document.createElement("tr");

                    // DEVICE (only first row of block)
                    if (i === 0) {
                        const d = createDeviceCell(device);
                        d.rowSpan = partCount;

                        const s = createSubDeviceCell(sd, openAddSubDeviceModal);
                        s.rowSpan = partCount;

                        row.appendChild(d);
                        row.appendChild(s);
                    }

                    // COMPONENT (only first row)
                    if (i === 0) {
                        const comp = createComponentCell(
                            c,
                            openAddComponentModal,
                            openEditComponentModal,
                            openAddPartToComponent
                        );
                        console.log("component:", c)
                        comp.rowSpan = partCount;

                        row.appendChild(comp);
                    }

                    // PARTS stacked vertically in SAME column
                    const part = parts[i];

                    if (part) {
                        row.appendChild(createPartCell(part, i, (p) =>
                            openEditPart(p, c.id)
                        ));
                    } else {
                        row.appendChild(createCell("-"));
                    }

                    table.appendChild(row);
                }
            }
        }
    }

    container.appendChild(table);
}
function createHeader() {
    const headerRow = document.createElement("tr");

    const headers = ["Устройство", "Подустройство", "Компонент", "Част"];

    headers.forEach((text, index) => {
        const th = document.createElement("th");

        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "column";
        wrapper.style.alignItems = "center";

        const title = document.createElement("span");
        title.textContent = text;

        wrapper.appendChild(title);

        if (index === 0) {
            const btn = document.createElement("button");
            btn.textContent = "Добави устройство";
            btn.className = "button-click";
            btn.onclick = openAddDeviceModal;

            wrapper.appendChild(btn);
        }

        th.appendChild(wrapper);

        th.style.border = "1px solid #ccc";
        th.style.padding = "8px";
        th.style.background = "#1b6bff";
        th.style.color = "white";

        headerRow.appendChild(th);
    });

    return headerRow;
}
function createEmptySubDeviceCell(deviceId) {
    const td = document.createElement("td");

    td.innerHTML = `
        <button class="button-click">Добави ново подустройство</button>
    `;

    td.querySelector("button").onclick =
        () => openAddSubDeviceModal(deviceId);

    style(td);
    return td;
}
function createEmptyComponentCell(subDeviceId) {
    const td = document.createElement("td");

    td.innerHTML = `
        <button class="button-click">Добави нов компонент</button>
    `;

    td.querySelector("button").onclick =
        () => openAddComponentModal(subDeviceId);

    style(td);
    return td;
}
document.addEventListener("DOMContentLoaded", () => {
    initDeviceModal();
    initSubDeviceModal();
    initComponentModal();
    initEditPartModal();
    initChangeComponent();
    initPartModal();
    initEditPartModal();
});
function style(td) {
    td.style.border = "1px solid #ccc";
    td.style.padding = "8px";
    td.style.textAlign = "center";
}