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
            node.children?.length
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

                </div>

                ${
            node.children?.length && isOpen
                ? `
                    ${createTree(node.children, expandedNodes, level + 1)}
                `
                : ""
        }

              ${
            showAddSubDevice
                ? `
            <div class="add-subDevice-wrapper">

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
            node.type === "subDevice" && isOpen
                ? `
                    <div class="add-component-wrapper">

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
        root.innerHTML = "Избери компонент";
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

        <div class="structure-layout">

            <div class="tree-panel">

                <h2>
                    Структура
                </h2>

                <div id="tree-root"></div>

            </div>

            <div class="details-panel">

                <h2>
                    Детайли
                </h2>

                <div id="details-root">

                    Избери елемент

                </div>

            </div>

        </div>
    `;
}

export function renderDetailsWithParts(component, parts) {

    const root =
        document.getElementById("details-root");

    if (!component) {
        root.innerHTML = "Избери компонент";
        return;
    }

    root.innerHTML = `
        <h3 class="details-title">
            ${component.name}
        </h3>

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

    <div class="part-actions">
        <button
            class="part-edit-btn"
            onclick='openEditPart(${JSON.stringify(p)}, ${component.id})'
        >
            Промени
        </button>

        <button
            class="part-delete-btn"
            onclick='openDeletePart(${JSON.stringify(p)}, ${component.id})'
        >
            Изтрий
        </button>
    </div>

</div>

                                <div class="part-body">

                                    <div class="part-inline-row">

                                        <div class="part-field">
                                            <span class="label">Описание:</span>
                                            <span class="part-field-item">
                                                ${p.description || "-"}
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

                                    </div>

                                </div>

                            </div>

                        `).join("")}

                    </div>
                `
            : "<p>Няма части</p>"
    }

        <div class="add-part-wrapper">

    <button
        class="register add-part-btn"
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