import {getFullStructure} from "../api/machinesApi.js";
import {mapStructure} from "../map/changeStructureMap.js";
import {renderDetails, renderLayout, renderTree} from "../render/changeStructureRender.js";
import {getPartsByComponentId} from "../api/componentsPartsApi.js";
import {renderDetailsWithParts} from "../render/changeStructureRender.js";



const params = new URLSearchParams(window.location.search);
let machineName = params.get("name");


// ========================================
// GLOBAL STATE
// ========================================

let structure = [];

let expandedNodes = new Set();   // 👈 НОВО

let selectedComponent = null;    // 👈 само за дясната част


// ========================================
// START
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    loadStructure();
});


// ========================================
// LOAD STRUCTURE
// ========================================

async function loadStructure() {

    try {

        const data =
            await getFullStructure(machineName);

        structure =
            mapStructure(data.structure || []);

        renderLayout();

        document.getElementById("machine-name").textContent = machineName;

        renderTree(structure, expandedNodes);   // ✅ ТОВА Е ВАЖНО

        renderDetails();         // (по желание)

    } catch (e) {

        console.error("Грешка при зареждане", e);
    }
}
function findNode(nodes, type, id) {

    for (const node of nodes) {

        if (node.type === type && node.id === id) {
            return node;
        }

        const found =
            findNode(node.children || [], type, id);

        if (found) {
            return found;
        }
    }

    return null;
}

window.selectNode = function(type, id) {

    const key = `${type}-${id}`;

    // expand/collapse само за tree
    if (expandedNodes.has(key)) {
        expandedNodes.delete(key);
    } else {
        expandedNodes.add(key);
    }

    // =========================
    // ONLY COMPONENT = DETAILS
    // =========================
    if (type === "component") {

        selectedComponent =
            findNode(structure, type, id);

        loadPartsAndRender(selectedComponent).then(r => console.log("Заредих части и рендерирах детайли"));//renderDetails

    } else {

        selectedComponent = null;
        renderDetails(null);
    }

    renderTree(structure, expandedNodes);
};
async function loadPartsAndRender(component) {

    try {

        const parts =
            await getPartsByComponentId(component.id);

        renderDetailsWithParts(component, parts);
        console.log("PARTS RAW:", parts);
        console.log("IS ARRAY:", Array.isArray(parts));

    } catch (e) {

        console.error("Error loading parts", e);
    }
}