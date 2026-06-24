import {getStructure} from "../service/structureService.js";
import {getPartsByComponentId} from "../api/componentsPartsApi.js";
import {openPartImages} from "../ui/modals.js";
import {openComponentImages} from "../ui/modals.js";

const machineName =
    new URLSearchParams(window.location.search)
        .get("name");

let allDevices = [];
let tableBodyElement = null;
let emptyMessageElement = null;

const filters = {
    search: "",
    device: "",
    subDevice: "",
    component: "",
    part: ""
};

document.addEventListener("DOMContentLoaded", () => {
    const pageTitle =
        document.getElementById("page-title");

    if (machineName && pageTitle) {
        pageTitle.textContent =
            `Структура на ${machineName}`;
    }

    loadStructure();
});

async function loadStructure() {
    const container =
        document.getElementById("structure-container");

    if (!container) {
        console.error("Missing #structure-container");
        return;
    }

    try {
        container.innerHTML = `
            <div class="structure-loading">
                Зареждане на структурата...
            </div>
        `;

        allDevices =
            await getStructure(machineName) || [];

        await attachPartsToComponents(allDevices);

        renderStructure();

    } catch (error) {
        console.error(error);

        container.innerHTML = `
            <p class="structure-error">
                Грешка при зареждане на структурата.
            </p>
        `;
    }
}

async function attachPartsToComponents(devices) {
    const components = [];

    for (const device of devices) {
        for (const subDevice of device.subDevices || []) {
            for (const component of subDevice.components || []) {
                components.push(component);
            }
        }
    }

    await Promise.all(
        components.map(async component => {
            component.parts =
                await getPartsByComponentId(component.id) || [];
        })
    );
}

function renderStructure() {
    const container =
        document.getElementById("structure-container");

    container.innerHTML = "";
    container.appendChild(createSearchBar());

    const table =
        document.createElement("table");

    table.className = "structure-table";
    table.appendChild(createHeader());

    tableBodyElement =
        document.createElement("tbody");

    table.appendChild(tableBodyElement);
    container.appendChild(table);

    emptyMessageElement =
        document.createElement("div");

    emptyMessageElement.className = "structure-empty";
    emptyMessageElement.textContent =
        "Няма намерени резултати по избраните филтри.";
    emptyMessageElement.style.display = "none";

    container.appendChild(emptyMessageElement);

    renderRows();
}

function renderRows() {
    if (!tableBodyElement) {
        return;
    }

    tableBodyElement.innerHTML = "";

    let visibleRows = 0;

    for (const device of allDevices) {
        const subDevices =
            device.subDevices || [];

        if (!subDevices.length) {
            if (rowMatchesFilters(device, null, null, null)) {
                appendRow(tableBodyElement, device.name, "-", "-", "-");
                visibleRows++;
            }

            continue;
        }

        for (const subDevice of subDevices) {
            const components =
                subDevice.components || [];

            if (!components.length) {
                if (rowMatchesFilters(device, subDevice, null, null)) {
                    appendRow(tableBodyElement, device.name, subDevice.name, "-", "-");
                    visibleRows++;
                }

                continue;
            }

            for (const component of components) {
                const parts =
                    component.parts || [];

                if (!parts.length) {
                    if (rowMatchesFilters(device, subDevice, component, null)) {
                        appendRow(
                            tableBodyElement,
                            device.name,
                            subDevice.name,
                            createComponentCell(component),
                            "-"
                        );

                        visibleRows++;
                    }

                    continue;
                }

                for (const part of parts) {
                    if (rowMatchesFilters(device, subDevice, component, part)) {
                        appendRow(
                            tableBodyElement,
                            device.name,
                            subDevice.name,
                            createComponentCell(component),
                            createPartCell(part)
                        );

                        visibleRows++;
                    }
                }
            }
        }
    }

    if (emptyMessageElement) {
        emptyMessageElement.style.display =
            visibleRows ? "none" : "block";
    }
}

function createSearchBar() {
    const wrapper =
        document.createElement("div");

    wrapper.className = "structure-search-bar";

    const input =
        document.createElement("input");

    input.id = "global-search";
    input.type = "search";
    input.placeholder = "Търси навсякъде в таблицата...";
    input.value = filters.search;

    input.addEventListener("input", event => {
        filters.search = event.target.value;
        renderRows();
    });

    wrapper.appendChild(input);

    return wrapper;
}

function createHeader() {
    const thead =
        document.createElement("thead");

    const titleRow =
        document.createElement("tr");

    ["Устройство", "Подустройство", "Компонент", "Част"]
        .forEach(text => {
            const th =
                document.createElement("th");

            th.textContent = text;
            titleRow.appendChild(th);
        });

    const filterRow =
        document.createElement("tr");

    filterRow.className = "structure-filter-row";

    filterRow.appendChild(createFilterHeaderCell(
        "device",
        getDeviceOptions(),
        "Всички устройства"
    ));

    filterRow.appendChild(createFilterHeaderCell(
        "subDevice",
        getSubDeviceOptions(),
        "Всички подустройства"
    ));

    filterRow.appendChild(createFilterHeaderCell(
        "component",
        getComponentOptions(),
        "Всички компоненти"
    ));

    filterRow.appendChild(createFilterHeaderCell(
        "part",
        getPartOptions(),
        "Всички части"
    ));

    thead.appendChild(titleRow);
    thead.appendChild(filterRow);

    return thead;
}

function createFilterHeaderCell(filterName, values, defaultText) {
    const th =
        document.createElement("th");

    const select =
        document.createElement("select");

    select.className = "structure-column-filter";

    const defaultOption =
        document.createElement("option");

    defaultOption.value = "";
    defaultOption.textContent = defaultText;
    select.appendChild(defaultOption);

    values.forEach(value => {
        const option =
            document.createElement("option");

        option.value = value;
        option.textContent = value;
        option.selected = value === filters[filterName];

        select.appendChild(option);
    });

    select.value = filters[filterName];

    select.addEventListener("change", event => {
        filters[filterName] = event.target.value;
        renderRows();
    });

    th.appendChild(select);

    return th;
}

function getDeviceOptions() {
    return uniqueSorted(
        allDevices.map(device => device.name)
    );
}

function getSubDeviceOptions() {
    const values = [];

    for (const device of allDevices) {
        for (const subDevice of device.subDevices || []) {
            values.push(subDevice.name);
        }
    }

    return uniqueSorted(values);
}

function getComponentOptions() {
    const values = [];

    for (const device of allDevices) {
        for (const subDevice of device.subDevices || []) {
            for (const component of subDevice.components || []) {
                values.push(component.name);
            }
        }
    }

    return uniqueSorted(values);
}

function getPartOptions() {
    const values = [];

    for (const device of allDevices) {
        for (const subDevice of device.subDevices || []) {
            for (const component of subDevice.components || []) {
                for (const part of component.parts || []) {
                    values.push(getPartLabel(part));
                }
            }
        }
    }

    return uniqueSorted(values);
}

function uniqueSorted(values) {
    return [...new Set(values.filter(Boolean))]
        .sort((a, b) => a.localeCompare(b, "bg"));
}

function rowMatchesFilters(device, subDevice, component, part) {
    const rowText = [
        device?.name,
        subDevice?.name,
        component?.name,
        component?.brand,
        component?.model,
        component?.additionalInfo,
        part?.partId,
        part?.partName,
        part?.brand,
        part?.model,
        part?.sapNumber,
        part?.quantity
    ].join(" ");

    return (
        (!filters.search || normalizeText(rowText).includes(normalizeText(filters.search))) &&
        (!filters.device || device?.name === filters.device) &&
        (!filters.subDevice || subDevice?.name === filters.subDevice) &&
        (!filters.component || component?.name === filters.component) &&
        (!filters.part || getPartLabel(part) === filters.part)
    );
}

function normalizeText(value) {
    return String(value || "")
        .toLowerCase()
        .trim();
}

function getPartLabel(part) {
    if (!part) {
        return "";
    }

    return `${part.partId || "-"} ${part.partName || "-"}`;
}

function appendRow(parent, device, subDevice, componentCell, partCell) {
    const tr =
        document.createElement("tr");

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

    parent.appendChild(tr);
}

function createCell(text) {
    const td =
        document.createElement("td");

    td.textContent =
        text || "-";

    return td;
}

function createComponentCell(component) {
    const td =
        document.createElement("td");

    const title =
        document.createElement("div");

    title.className = "entity-title";
    title.textContent =
        component.name || "-";

    td.appendChild(title);
    td.appendChild(createInfoLine("Марка", component.brand));
    td.appendChild(createInfoLine("Модел", component.model));
    td.appendChild(createInfoLine("Описание", component.additionalInfo));

    const button =
        document.createElement("button");

    button.type = "button";
    button.className = "component-image-btn-view";
    button.textContent = "Снимки на този компонент";

    button.addEventListener("click", () => {
        openComponentImages(component.id);
    });

    td.appendChild(button);

    return td;
}

function createPartCell(part) {
    const td =
        document.createElement("td");

    const title =
        document.createElement("div");

    title.className = "entity-title";
    title.textContent =
        `${part.partId || "-"}. ${part.partName || "-"}`;

    td.appendChild(title);
    td.appendChild(createInfoLine("Марка", part.brand));
    td.appendChild(createInfoLine("Модел", part.model));
    td.appendChild(createInfoLine("SAP номер", part.sapNumber));
    td.appendChild(createInfoLine("Брой", part.quantity));

    const button =
        document.createElement("button");

    button.type = "button";
    button.className = "part-images-btn";
    button.textContent = "Снимки на тази част";

    button.addEventListener("click", () => {
        openPartImages(part.partId);
    });

    td.appendChild(button);

    return td;
}

function createInfoLine(label, value) {
    const line =
        document.createElement("div");

    line.className = "entity-info-line";

    const strong =
        document.createElement("strong");

    strong.textContent =
        `${label}: `;

    line.appendChild(strong);
    line.append(value || "-");

    return line;
}

window.reloadPageStructure =
    loadStructure;
