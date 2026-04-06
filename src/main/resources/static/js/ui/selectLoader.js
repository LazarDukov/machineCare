import {getDevices} from "../api/devicesApi.js";

export function loadDevices(select) {
    const params = new URLSearchParams(window.location.search);
    const machineName = params.get("name");

    getDevices(machineName).then(devices => {
        if (!devices.length) {
            select.innerHTML = "<option>Няма устройства</option>";
            return;
        }

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
    fetch(`/api/sub-devices/all`, {
        credentials: "include"
    })
        .then(res => res.json())
        .then(subDevices => {
            if (!subDevices.length) {
                select.innerHTML = "<option>Няма подустройства</option>";
                return;
            }

            select.innerHTML = "<option value=''>-- Избери подустройство --</option>";

            subDevices.forEach(sd => {
                const option = document.createElement("option");
                option.value = sd.id;
                option.textContent = sd.name;

                select.appendChild(option);
            });
        });
}