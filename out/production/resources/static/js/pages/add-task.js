import {getDevices} from "../api/devicesApi.js";
import {getSubDevicesByDeviceId} from "../api/subDevicesApi.js";
import {getComponentsBySubDeviceId} from "../api/componentsApi.js";

const form = document.getElementById("task-form");

const deviceSelect = document.getElementById("device-select");
const subDeviceSelect = document.getElementById("sub-device-select");
const componentSelect = document.getElementById("component-select");

let machineName = null;
let deviceId = null;
let subDeviceId = null;
let componentId = null;

/* =========================
   LOAD DEVICES BY MACHINE NAME
========================= */
const params = new URLSearchParams(window.location.search);
machineName = params.get("name");

getDevices(machineName).then(devices => {
    console.log("Машина" + machineName)
    deviceSelect.innerHTML = "<option value=''>-- Избери устройство --</option>";

    devices.forEach(d => {
        const option = document.createElement("option");
        option.value = d.id;
        option.textContent = d.name;
        deviceSelect.appendChild(option);
    });
    console.log("Заредени устройства:", devices);
});

/* =========================
   DEVICE CHANGE
========================= */
deviceSelect.addEventListener("change", () => {
    deviceId = deviceSelect.value;

    // 🔥 reset и двете
    resetSubDevices();
    resetComponents();

    if (!deviceId) return;

    subDeviceSelect.disabled = false;
    subDeviceSelect.innerHTML = "<option>Зареждане...</option>";

    getSubDevicesByDeviceId(deviceId).then(subDevices => {

        subDeviceSelect.innerHTML = "<option value=''>-- Избери подустройство --</option>";

        subDevices.forEach(sd => {
            const option = document.createElement("option");
            option.value = sd.id;
            option.textContent = sd.name;
            subDeviceSelect.appendChild(option);
        });
    });
});

/* =========================
   SUB DEVICE CHANGE
========================= */
subDeviceSelect.addEventListener("change", () => {
    subDeviceId = subDeviceSelect.value;

    // 🔥 reset component
    resetComponents();

    if (!subDeviceId) return;

    componentSelect.disabled = false;
    componentSelect.innerHTML = "<option>Зареждане...</option>";

    getComponentsBySubDeviceId(subDeviceId).then(components => {

        componentSelect.innerHTML = "<option value=''>-- Избери компонент --</option>";

        components.forEach(c => {
            const option = document.createElement("option");
            option.value = c.id;
            option.textContent = c.name;
            componentSelect.appendChild(option);
        });
    });
});
/* =========================
   COMPONENT CHANGE
========================= */
componentSelect.addEventListener("change", () => {
    componentId = componentSelect.value;
});

/* =========================
   SUBMIT
========================= */
form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const data = {
            title: formData.get("title"),
            description: formData.get("description")?.trim() || "Няма",
            additionalInfo: formData.get("additionalInfo")?.trim() || "Няма",
            machineName: machineName, // 👈 важно
            deviceId: deviceId,
            subDeviceId: subDeviceId,
            componentId: componentId,
            repeatedAfter: Number(formData.get("repeatedAfter")),
            periodEnum: formData.get("periodEnum")
        };

        try {
            const response = await fetch("/api/tasks/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Успешно добавена задача");
                window.location.href = "/machines/extruders/machine-details.html?name=" + machineName; // връщаме към задачите на маш
            } else {
                alert("Грешка");
            }

        } catch
            (e) {
            console.error(e);
            alert("Сървърна грешка");
        }
    }
)
;

function resetSubDevices() {
    subDeviceSelect.innerHTML = "<option value=''>-- Избери подустройство --</option>";
    subDeviceSelect.disabled = true;
    subDeviceId = null;
}

function resetComponents() {
    componentSelect.innerHTML = "<option value=''>-- Избери компонент --</option>";
    componentSelect.disabled = true;
    componentId = null;
}