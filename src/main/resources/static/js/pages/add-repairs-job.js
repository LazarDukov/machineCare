import { getTechnicians } from "../api/usersApi.js";
import {openEmployeeTechniciansModal} from "../ui/modals.js";
import {createRepair} from "../api/repairJobsApi.js";
import { renderHeader } from "../ui/header.js";

document.addEventListener("DOMContentLoaded", renderHeader);
let selectedTechnicians;
document.addEventListener("DOMContentLoaded", async () => {
    await loadTechnicians();

    document
        .getElementById("repair-form")
        .addEventListener("submit", saveRepair);
});
async function loadTechnicians() {
    const users = await getTechnicians();

    const btn = document.getElementById("choose-technicians-btn");

    btn.onclick = async () => {

        const result = await openEmployeeTechniciansModal(users);

        if (!result) return;

        selectedTechnicians = result.ids;

        console.log(selectedTechnicians);

    };
}

async function saveRepair(e) {
    e.preventDefault();
    const name = document.getElementById("repair-name").value.trim();
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const description = document.getElementById("repair-description").value.trim();
    const machineName =
        new URLSearchParams(window.location.search).get("name");
    console.log("Saving repair...", machineName, name, startDate, endDate, selectedTechnicians, description);
    const body = {
        machineName,
        name,
        startDate,
        endDate,
        technicianIds: selectedTechnicians,
        description
    };

    await createRepair(body);

    window.location.href = `/repair-job.html?name=${body.machineName}`;
}
