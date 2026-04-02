import {getMachineByName} from "../api/machinesApi.js";

import {submitEntity} from "../ui/entityHandler.js";

let machineName = null;

function init() {
    const params = new URLSearchParams(window.location.search);
    machineName = params.get("name");

    document.getElementById("machine-name").innerText = machineName || "Машина";

    if (machineName) {
        loadMachine(machineName);
    }

    // 👉 правим функции достъпни за HTML
    window.goToSpareParts = goToSpareParts;
    window.goToRepairs = goToRepairs;
    window.goToMaintenance = goToMaintenance;
    window.handleSubmit = handleSubmit;
}

async function loadMachine(name) {
    const container = document.getElementById("machine-info");

    try {
        const data = await getMachineByName(name);

        container.innerHTML = `
            <p><strong>Идентификационен номер:</strong> ${data.identificationNumber}</p>
            <p><strong>Тип:</strong> ${data.type}</p>
            <p><strong>Описание:</strong> ${data.description || "Няма"}</p>
        `;

        if (data.url) {
            document.getElementById("machine-frame").src = data.url;
        }

    } catch (err) {
        container.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
}

// 👉 navigation
function goToSpareParts() {
    window.location.href = `/spare-parts.html?name=${encodeURIComponent(machineName)}`;
}

function goToRepairs() {
    window.location.href = `/repairs.html?name=${encodeURIComponent(machineName)}`;
}

function goToMaintenance() {
    window.location.href = `/maintenance.html?name=${encodeURIComponent(machineName)}`;
}

// 👉 submit wrapper
async function handleSubmit() {
    const input = document.getElementById("entity-name-input");
    const selectId = document.getElementById("relation-select").value;
    const message = document.getElementById("entity-message");

    const name = input.value.trim();
    const type = document.getElementById("modal-title").innerText.substring(6).trim();

    try {
        await submitEntity(type, name, selectId);

        message.style.color = "green";
        message.innerText = "Успешно добавено";

    } catch (err) {
        message.style.color = "red";
        message.innerText = err.message;
    }
}

document.addEventListener("DOMContentLoaded", init);