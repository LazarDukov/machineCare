import { getDevices } from "../api/devicesApi.js";
import {loadDevices} from "../ui/selectLoader";

function init() {
    const container = document.getElementById("devices-container");

    if (!container) {
        console.error("Няма #devices в HTML");
        return;
    }

    loadDevices(container);

    // 👉 правим функцията достъпна за HTML
    window.goToAddDevice = goToAddDevice;
}

async function loadDevices(container) {
    try {
        container.innerHTML = "<p>Зареждане...</p>";

        const devices = await getDevices();

        //renderMachines(container, machines);

    } catch (err) {
        console.error(err);
        container.innerHTML = "<p style='color:red;'>Грешка при зареждане</p>";
    }
}

// 👉 navigation
function goToAddDevices() {
    window.location.href = "/devices/{machineName}/add";
}

// 👉 старт
document.addEventListener("DOMContentLoaded", init);