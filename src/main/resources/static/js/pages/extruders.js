import { getMachinesByType } from "../api/machinesApi.js";
import { renderMachines } from "../ui/machineRenderer.js";

function init() {
    const container = document.getElementById("machines-container");

    if (!container) {
        console.error("Няма #machines-container в HTML");
        return;
    }

    loadMachines(container);

    // 👉 правим функцията достъпна за HTML
    window.goToAddMachine = goToAddMachine;
}

async function loadMachines(container) {
    try {
        container.innerHTML = "<p>Зареждане...</p>";

        const machines = await getMachinesByType("EXTRUDER");

        renderMachines(container, machines);

    } catch (err) {
        console.error(err);
        container.innerHTML = "<p style='color:red;'>Грешка при зареждане</p>";
    }
}

// 👉 navigation
function goToAddMachine() {
    window.location.href = "/machines/extruders/add";
}

// 👉 старт
document.addEventListener("DOMContentLoaded", init);