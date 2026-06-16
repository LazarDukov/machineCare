import {getStructure} from "../service/structureService.js";
import {mapStructure} from "../map/changeStructureMap.js";
import {renderDetails, renderLayout, renderTree} from "../render/changeStructureRender.js";
import {getPartsByComponentId} from "../api/componentsPartsApi.js";
import {renderDetailsWithParts} from "../render/changeStructureRender.js";
import {
    initPartModal,
    initEditPartModal,
    initComponent,
    initSubDevice,
    initDevice,
    initChangeComponent, initChangeSubDevice, initChangeDevice
} from "../ui/modals.js";



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

    initPartModal();

    initEditPartModal();

    initComponent();
    initChangeComponent()
    initSubDevice();
    initChangeSubDevice();
    initDevice();
    initChangeDevice();

});


// ========================================
// LOAD STRUCTURE
// ========================================

export async function loadStructure() {

    try {

        const rawStructure =
            await getStructure(machineName);

        structure =
            mapStructure(rawStructure);

        renderLayout();

        document.getElementById("machine-name").textContent = machineName;

        renderTree(structure, expandedNodes);   // ✅ ТОВА Е ВАЖНО

        renderDetails();         // (по желание)

    } catch (e) {

        console.error("Грешка при зареждане", e);
    }
}

window.reloadPageStructure = loadStructure;

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

window.selectNode = function (type, id) {

    const key = `${type}-${id}`;

    if (expandedNodes.has(key)) {
        expandedNodes.delete(key);
    } else {
        expandedNodes.add(key);
    }

    if (type === "component") {

        selectedComponent = findNode(structure, type, id);

        loadPartsAndRender(selectedComponent).then(r => console.log("Parts loaded and rendered"));

    } else {

        selectedComponent = null;
        renderDetails(null);
    }

    renderTree(structure, expandedNodes, selectedComponent);
};

async function loadPartsAndRender(component) {

    try {

        const parts =
            await getPartsByComponentId(component.id);

        renderDetailsWithParts(component, parts);


    } catch (e) {

        console.error("Error loading parts", e);
    }
}



