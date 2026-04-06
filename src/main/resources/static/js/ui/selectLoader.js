import {getDevices} from "../api/devicesApi.js";
import {getSubDevicesByDeviceId} from "../api/subDevicesApi.js";

export function loadDevices(selectDevice) {
    const params = new URLSearchParams(window.location.search);
    const machineName = params.get("name");

    getDevices(machineName).then(devices => {
        if (!devices.length) {
            selectDevice.innerHTML = "<option>Няма устройства</option>";
            return;
        }

        selectDevice.innerHTML = "<option value=''>-- Избери устройство --</option>";

        devices.forEach(device => {
            const option = document.createElement("option");
            option.value = device.id;
            option.textContent = device.name;

            selectDevice.appendChild(option);
        });
    });
}


    export function loadSubDevicesByDevice(suDeviceSelect, deviceId) {

        if (!deviceId) {
            suDeviceSelect.innerHTML = "<option>Първо избери устройство</option>";
            suDeviceSelect.disabled = true;
            return;
        }

        suDeviceSelect.disabled = false;

        getSubDevicesByDeviceId(deviceId).then(subDevices => {

            if (!subDevices.length) {
                suDeviceSelect.innerHTML = "<option>Няма подустройства</option>";
                return;
            }

            suDeviceSelect.innerHTML = "<option value=''>-- Избери подустройство --</option>";

            subDevices.forEach(sd => {
                const option = document.createElement("option");
                option.value = sd.id;
                option.textContent = sd.name;

                suDeviceSelect.appendChild(option);
            });
        });

}