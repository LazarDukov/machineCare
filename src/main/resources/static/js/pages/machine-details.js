import {getMachineByName} from "../api/machinesApi.js";
import {submitEntity} from "../ui/entityHandler.js";

// 👉 глобално за страницата
let machineName = null;

async function loadMachine(name) {
    const container = document.getElementById("machine-info");

    try {
        const data = await getMachineByName(name);

        container.innerHTML = `
            <p><strong>Идентификационен номер:</strong> ${data.identificationNumber}</p>
            <p><strong>Тип:</strong> ${data.type}</p>
            <p><strong>Описание:</strong> ${data.description || "Няма"}</p>
        `;

    } catch (err) {
        container.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
}

function init() {
    const params = new URLSearchParams(window.location.search);
    machineName = params.get("name");

    document.getElementById("machine-name").innerText = machineName || "Машина";

    console.log("Търсим машина с име:", machineName);

    loadMachine(machineName);

    // 👉 expose към HTML
    window.goToSpareParts = goToSpareParts;
    window.goToRepairs = goToRepairs;
    window.goToTasks = goToTasks;
    window.goToAddTask = goToAddTask;
    window.handleSubmit = handleSubmit;
}

// 👉 navigation
function goToSpareParts() {
    window.location.href = `/spare-parts.html?name=${encodeURIComponent(machineName)}`;
}

function goToRepairs() {
    window.location.href = `/repairs.html?name=${encodeURIComponent(machineName)}`;
}

function goToTasks() {
    const params = new URLSearchParams(window.location.search);
    const machineName = params.get("name");

    window.location.href = `/tasks/all?name=${encodeURIComponent(machineName)}`;
}

function goToAddTask() { // this is ready!
    window.location.href = `/tasks/add?name=${encodeURIComponent(machineName)}`;
}

// 👉 submit wrapper
async function handleSubmit() {
    const input = document.getElementById("entity-name-input");
    const message = document.getElementById("entity-message");
    const selectDevice = document.getElementById("device-select").value;
    const selectSubDevice = document.getElementById("subDevice-select").value;
    const additionalInfo = document.getElementById("extra-info-input")?.value || "";

    const name = input.value.trim();

    await submitEntity(name, selectDevice, selectSubDevice, additionalInfo, message);
}

document.addEventListener("DOMContentLoaded", init);