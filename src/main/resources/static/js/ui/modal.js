import {loadDevices} from "./selectLoader";
import {loadSubDevices} from "./selectLoader";

export function openDevicesModal() {
    const modal = document.getElementById("devices-modal");
    const container = document.getElementById("devices-container");

    modal.style.display = "block";
    container.innerHTML = "<p>Зареждане...</p>";

    // 👉 взимаме machineName от URL (ако вече го имаш, ползвай него)
    const params = new URLSearchParams(window.location.search);
    const machineName = params.get("name");

    fetch(`/api/devices/all/${encodeURIComponent(machineName)}`, {
        credentials: "include"
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Грешка при зареждане");
            }
            return res.json();
        })
        .then(devices => {

            if (!devices || devices.length === 0) {
                container.innerHTML = "<p>Няма добавени устройства</p>";
                return;
            }

            container.innerHTML = "";

            devices.forEach(device => {
                const div = document.createElement("div");
                div.textContent = device.name; // според DTO-то ти
                div.style.padding = "10px";
                div.style.background = "#eee";
                div.style.borderRadius = "8px";

                container.appendChild(div);
            });

        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "<p style='color:red;'>Грешка при зареждане</p>";
        });
}


export function openEntityModal(type) {

    const modal = document.getElementById("add-entity-modal");
    const title = document.getElementById("modal-title");
    const selectContainer = document.getElementById("relation-select-container");
    const select = document.getElementById("relation-select");

    modal.style.display = "flex";
    select.innerHTML = "";

    if (type === "device") {
        title.innerText = "Добави устройство";
        selectContainer.style.display = "none";
    } else if (type === "subDevice") {
        title.innerText = "Добави подустройство";
        selectContainer.style.display = "block";
        loadDevices(select);
    } else if (type === "component") {
        title.innerText = "Добави компонент";
        selectContainer.style.display = "block";

        loadSubDevices(select);
    }

    document.getElementById("entity-name-input").value = "";
    document.getElementById("entity-message").innerText = "";
}
function closeModal(element) {
    const modal = element.closest(".modal");
    modal.style.display = "none";

}

window.openDevicesModal = openDevicesModal;
window.openEntityModal = openEntityModal;
window.closeModal = closeModal;