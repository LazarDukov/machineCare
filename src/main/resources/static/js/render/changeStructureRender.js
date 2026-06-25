const container = document.getElementById("structure-container");

let selectedComponent = null;

export function renderTree(structure, expandedNodes, selectedComponent) {

    const root = document.getElementById("tree-root");

    root.innerHTML = createTree(structure, expandedNodes, selectedComponent);
}

function createTree(nodes, expandedNodes, componentOpened, level = 0) {

    let html = `<ul class="tree-level tree-level-${level}">`;

    nodes.forEach((node, index) => {

        const key = `${node.type}-${node.id}`;
        const isOpen = expandedNodes.has(key);

        const showAddSubDevice =
            node.type === "device"
            && isOpen
            && !selectedComponent;

        const showAddDevice =
            node.type === "device"
            && index === nodes.length - 1
            && !selectedComponent;

        html += `
            <li>

                <div class="tree-item-wrapper">

                    <div 
                        class="tree-item level-${level}"
                        onclick="selectNode('${node.type}', ${node.id})"
                    >

                        <div class="tree-left">

                            <span class="tree-number">
                                ${index + 1}
                            </span>

                            <span class="tree-name">
                                ${node.name}
                            </span>

                        </div>

                       ${
            node.type === "device" || node.type === "subDevice"
                ? `
            <span class="tree-arrow">
                ${isOpen ? "▼" : "▶"}
            </span>
          `
                : ""
        }

                    </div>

                   ${
            node.type === "component"
                ? `
            <div class="tree-actions">

                <button
                    class="tree-edit-btn"
                    onclick='event.stopPropagation(); openEditComponent(${JSON.stringify(node.original)})'
                >
                    ✏️
                </button>

                <button
                    class="tree-delete-btn"
                    onclick='event.stopPropagation(); openDeleteComponent(${node.id})'
                >
                    ❌
                </button>

            </div>
        `
                : ""
        }

${
            node.type === "subDevice"
                ? `
            <div class="tree-actions">

                <button
                    class="tree-edit-btn"
                    onclick='event.stopPropagation(); openEditSubDevice(${JSON.stringify(node.original)})'
                >
                    ✏️
                </button>

                <button
                    class="tree-delete-btn"
                    onclick='event.stopPropagation(); openDeleteSubDevice(${node.id})'
                >
                    ❌
                </button>

            </div>
        `
                : ""
        }

${
            node.type === "device"
                ? `
            <div class="tree-actions">

                <button
                    class="tree-edit-btn"
                    onclick='event.stopPropagation(); openEditDevice(${JSON.stringify(node.original)})'
                >
                    ✏️
                </button>

                <button
                    class="tree-delete-btn"
                    onclick='event.stopPropagation(); openDeleteDevice(${node.id})'
                >
                    ❌
                </button>

            </div>
        `
                : ""
        }

                </div>

                ${
            isOpen
                ? `
            ${createTree(node.children || [], expandedNodes, selectedComponent, level + 1)}
          `
                : ""
        }

                ${
            showAddSubDevice
                ? `
    <div class="add-subDevice-wrapper level-1-action">

        <button
            class="add-subDevice-btn"
            onclick="event.stopPropagation(); openAddSubDevice(${node.id})"
        >
            + Добави подустройство
        </button>

    </div>
`
                : ""
        }

                ${
            showAddDevice
                ? `
    <div class="add-device-wrapper level-0-action">

        <button
            class="add-device-btn"
            onclick="event.stopPropagation(); openAddDevice(${node.id})"
        >
            + Добави устройство
        </button>

    </div>
`
                : ""
        }

                ${
            node.type === "subDevice" && isOpen
                ? `
    <div class="add-component-wrapper level-2-action">

        <button
            class="add-component-btn"
            onclick="event.stopPropagation(); openAddComponent(${node.id})"
        >
            + Добави компонент
        </button>

    </div>
`
                : ""
        }

            </li>
        `;
    });

    html += "</ul>";

    return html;
}

export function renderDetails(component) {

    const root =
        document.getElementById("details-root");


        if (!component) {
            root.innerHTML = `
        <h2 class="details-subtitle">
            Избери компонент
        </h2>
    `;
            return;

    }

    const parts = component.original.parts || [];

    if (!parts.length) {
        root.innerHTML = "<p>Няма части</p>";
        return;
    }

    root.innerHTML = `
        <h3>${component.name}</h3>

        <ul>
            ${parts.map(p => `
                <li>${p.partName}</li>
            `).join("")}
        </ul>
    `;
}

export function renderLayout() {

    container.innerHTML = `
 <input
            type="file"
            id="part-image-input"
            accept="image/*"
            style="display:none"
        >
<input
        type="file"
        id="component-image-input"
        accept="image/*"
        style="display:none"
    >
        <div class="structure-layout">

            <div class="tree-panel">
    <h2 class="details-subtitle">Структура</h2>
    <div id="tree-root"></div>
</div>

<div class="details-panel">
    <div id="details-root">
        <h2 class="details-subtitle">Избери компонент</h2>
    </div>
</div>
    `;
}

export function renderDetailsWithParts(component, parts) {

    const root =
        document.getElementById("details-root");

    if (!component) {
        root.innerHTML = `
        <h2 class="details-subtitle">
            Избери компонент
        </h2>
    `;
        return;
    }

    root.innerHTML = `
        <h3 class="details-subtitle">
            ${component.name}
        </h3>
         
        <button 
        class="component-image-btn-add"
        onclick="openImagePickerForComponent(${component.id})"
    >
        Добави снимка за компонента
    </button>
    <button
        class="component-image-btn-view"
        onclick="openComponentImages(${component.id})"
    >
        Виж снимки за компонента
    </button>

        <h4 class="details-subtitle">
            Части (${parts.length})
        </h4>

        ${
        parts.length
            ? `
                    <div class="parts-list">

                        ${parts.map((p, index) => `

   <div class="part-card">

    <div class="part-header">
        <div class="part-header-left">
            <span class="part-number">
                #${index + 1}
            </span>

            <span class="part-name">
                ${p.partName}
            </span>
        </div>
    </div>

    <div class="part-body">

        <div class="part-inline-row">

            <div class="part-field">
                <span class="label">Марка:</span>
                <span class="part-field-item">
                    ${p.brand || "-"}
                </span>
            </div>

            <div class="part-field">
                <span class="label">Модел/тип:</span>
                <span class="part-field-item">
                    ${p.model || "-"}
                </span>
            </div>

            <div class="part-field">
                <span class="label">SAP:</span>
                <span class="part-field-item">
                    ${p.sapNumber || "-"}
                </span>
            </div>

            <div class="part-field">
                <span class="label">Qty:</span>
                <span class="part-field-item">
                    ${p.quantity || 0}
                </span>
            </div>

            <div class="part-field">
                <span class="label">Допълнителна информация:</span>
                <span class="part-field-item">
                    ${p.additionalInfo || "-"}
                </span>
            </div>

        </div>

        <div class="part-actions">
            <button
                class="part-image-btn"
                onclick="openImagePickerForPart(${p.partId})"
            >
                Добави снимка
            </button>

            <button
                class="part-images-btn"
                onclick="openPartImages(${p.partId})"
            >
                Снимки на частта
            </button>

            <button
                class="part-edit-btn"
                onclick='openEditPart(${JSON.stringify(p)}, ${component.id})'
            >
                Промени частта
            </button>

            <button
                class="part-delete-btn"
                onclick='openDeletePart(${JSON.stringify(p)}, ${component.id})'
            >
                Изтрий частта
            </button>
        </div>

    </div>

</div>

                            

                        `).join("")}

                    </div>
                `
            : "<p>Няма части</p>"
    }

        <div>

            <button
                class="add-part-btn"
                onclick="openAddPartToComponent(${component.id})"
            >
                + Добави нова част
            </button>

        </div>
    `;
}

function hasOpenChild(node, expandedNodes) {

    if (!node.children) return false;

    for (const child of node.children) {

        const key = `${child.type}-${child.id}`;

        if (expandedNodes.has(key)) {
            return true;
        }

        if (hasOpenChild(child, expandedNodes)) {
            return true;
        }
    }

    return false;
}

let currentPartId = null;
window.openImagePickerForPart = function (partId) {

    currentPartId = partId;

    document
        .getElementById("part-image-input")
        .click();
};
let currentComponentId = null;
window.openImagePickerForComponent = function (componentId) {
    console.log(componentId)
    currentComponentId = componentId;

    document
        .getElementById("component-image-input")
        .click();
}


document.addEventListener("change", async (e) => {

    if (e.target.id !== "part-image-input") {
        return;
    }


    const file = e.target.files[0];

    if (!file) {
        return;
    }

    // ✅ FIX ТУК
    const partId = currentPartId;
    console.log(partId)
    console.log(currentPartId)
    const formData = new FormData();

    formData.append("file", file);
    formData.append("partId", partId);

    console.log(formData.get("file"));
    console.log(formData.get("partId"));

    try {

        await fetch(`/api/parts/add-image`, {
            method: "POST",
            body: formData
        });

        alert("Снимката е качена успешно");

    } catch (err) {

        console.error(err);
        alert("Грешка при качване");

    } finally {

        e.target.value = "";
        currentPartId = null; // (по-добра практика)
    }
});
document.addEventListener("change", async (e) => {

    if (e.target.id !== "component-image-input") {
        return;
    }


    const file = e.target.files[0];

    if (!file) {
        return;
    }

    // ✅ FIX ТУК
    const componentId = currentComponentId;
    console.log(componentId)
    console.log(currentComponentId)
    const formData = new FormData();

    formData.append("file", file);
    formData.append("componentId", componentId);

    console.log(formData.get("file"));
    console.log(formData.get("componentId"));

    try {

        await fetch(`/api/components/add-image`, {
            method: "POST",
            body: formData
        });

        alert("Снимката е качена успешно");

    } catch (err) {

        console.error(err);
        alert("Грешка при качване");

    } finally {

        e.target.value = "";
        currentComponentId = null; // (по-добра практика)
    }
});