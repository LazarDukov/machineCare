import {getRepairs} from "../api/repairJobsApi.js";

const tbody = document.getElementById("repairs-body");
const params = new URLSearchParams(window.location.search);
const machineName = params.get("name");
const pageTitle = document.getElementById("page-title");
pageTitle.textContent = `История за ремонти извършени на РЦ ${machineName}`;
document.getElementById("add-repair-btn").addEventListener("click", () => {
    window.location.href =
        `/api/repairs-job/add?name=${encodeURIComponent(machineName)}`;
});

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
                .join(" ");
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
            `;

            tr.querySelector("button").onclick = () => {
                openRepairModal(repair.description);
            };

            tbody.appendChild(tr);
        });

    } catch (err) {
        console.error(err);
    }
}
function openRepairModal(text){

    document.getElementById("repair-description").textContent = text;

    document.getElementById("repair-modal").style.display = "block";
}

function closeRepairModal(){

    document.getElementById("repair-modal").style.display = "none";
}

window.onclick = function(event){

    const modal = document.getElementById("repair-modal");

    if(event.target === modal){
        closeRepairModal();
    }

}