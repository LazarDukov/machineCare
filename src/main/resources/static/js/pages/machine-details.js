import {getMachineByName} from "../api/machinesApi.js";


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

    loadMachine(machineName).then();

    // 👉 expose към HTML
    window.goToRepairs = goToRepairs;
    window.goToTasks = goToTasks;
    window.goToAddTask = goToAddTask;
    window.goToFullStructure = goToFullStructure;

}


function goToFullStructure() {
    console.log("machineName:", machineName);
    window.location.href = `/full-structure?name=${encodeURIComponent(machineName)}`;
}

function goToRepairs() {
    window.location.href = `/repairs.html?name=${encodeURIComponent(machineName)}`;
}

function goToTasks() {

    window.location.href = `/tasks/all?name=${encodeURIComponent(machineName)}`;
}

function goToAddTask() { // this is ready!
    window.location.href = `/tasks/add?name=${encodeURIComponent(machineName)}`;
}


// 👉 submit wrapper


document.addEventListener("DOMContentLoaded", init);