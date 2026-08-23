import {changeRepair, getRepairs} from "../api/repairJobsApi.js";
import {openRepairModal, openEditRepairModal} from "../ui/modals.js";
import {getTechnicians} from "../api/usersApi.js";
import { renderHeader } from "../ui/header.js";

document.addEventListener("DOMContentLoaded", renderHeader);
const tbody = document.getElementById("repairs-body");
const params = new URLSearchParams(window.location.search);
const machineName = params.get("name");
const pageTitle = document.getElementById("page-title");
pageTitle.textContent = `История за ремонти извършени на РЦ ${machineName}`;
document.getElementById("add-repair-btn").addEventListener("click", () => {
    window.location.href =
        `/api/repairs-job/add?name=${encodeURIComponent(machineName)}`;
});

const technicians = await getTechnicians();
await loadRepairs();

async function loadRepairs() {

    try {

        const repairs = await getRepairs(machineName);
        console.log(repairs)
        tbody.innerHTML = "";

        repairs.forEach(repair => {

            console.log(repair.technicians)
            console.log(typeof repair.technicianIds);
            console.log(Array.isArray(repair.technicianIds));
            const tr = document.createElement("tr");
            const technicianNames = repair.technicians
                .map(t => `${t.firstName} ${t.lastName}`)
                .join("<br>");
            tr.innerHTML = `
                <td>${repair.name}</td>
                <td>${repair.startDate}</td>
                <td>${repair.endDate}</td>
                <td>${technicianNames}</td>
<!--                TODO: SHOULD CREATE THIS CORRECTLY!-->
                <td>
                    <button class="part-images-btn">
                        Виж описание
                    </button>
                </td>
                <td>
                <button class="edit-repair-btn">
                Промени
                    </button>
                <br>
                <button class="delete-repair-btn">
                Изтрий
                </button>
                </td>
            `;

            tr.querySelector("button").onclick = () => {
                openRepairModal(repair.description);
            };

            tr.querySelector(".edit-repair-btn").onclick = async () => {

                const result = await openEditRepairModal(
                    repair,
                    technicians
                );

                if (!result) return;
                console.log("result", result)
                await changeRepair(result);

                await loadRepairs();
            };
            tbody.appendChild(tr);
        });

    } catch (err) {
        console.error(err);
    }
}
