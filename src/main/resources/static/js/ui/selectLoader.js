import { getDevices } from "../api/devicesApi.js";
import { getSubDevices } from "../api/subDevicesApi.js";

export function loadDevices(select, machineName) {
    getDevices(machineName).then(devices => {
        select.innerHTML = "<option value=''>-- Избери устройство --</option>";

        devices.forEach(device => {
            const option = document.createElement("option");
            option.value = device.id;
            option.textContent = device.name;
            select.appendChild(option);
        });
    });
}

export function loadSubDevices(select) {
    getSubDevices().then(subDevices => {
        select.innerHTML = "<option value=''>-- Избери подустройство --</option>";

        subDevices.forEach(sd => {
            const option = document.createElement("option");
            option.value = sd.id;
            option.textContent = sd.name;
            select.appendChild(option);
        });
    });
}

window.loadDevices = loadDevices;
window.loadSubDevices = loadSubDevices;