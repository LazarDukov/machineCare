import {getDevices} from "../api/devicesApi.js";
import {getSubDevicesByDeviceId} from "../api/subDevicesApi.js";
import {getComponentsBySubDeviceId} from "../api/componentsApi.js";

export async function initTaskDropdowns({
                                            machineName,
                                            deviceSelect,
                                            subDeviceSelect,
                                            componentSelect,
                                            selectedDeviceId = null,
                                            selectedSubDeviceId = null,
                                            selectedComponentId = null
                                        }) {

    const devices = await getDevices(machineName);

    deviceSelect.innerHTML =
        "<option value=''>-- Избери устройство --</option>";

    devices.forEach(device => {
        deviceSelect.appendChild(
            new Option(device.name, device.id)
        );
    });

    deviceSelect.addEventListener("change", async () => {

        subDeviceSelect.innerHTML =
            "<option value=''>-- Избери подустройство --</option>";

        componentSelect.innerHTML =
            "<option value=''>-- Избери компонент --</option>";

        subDeviceSelect.disabled = true;
        componentSelect.disabled = true;

        if (!deviceSelect.value) return;

        const subDevices =
            await getSubDevicesByDeviceId(deviceSelect.value);

        subDeviceSelect.disabled = false;

        subDevices.forEach(sd => {
            subDeviceSelect.appendChild(
                new Option(sd.name, sd.id)
            );
        });
    });

    subDeviceSelect.addEventListener("change", async () => {

        componentSelect.innerHTML =
            "<option value=''>-- Избери компонент --</option>";

        componentSelect.disabled = true;

        if (!subDeviceSelect.value) return;

        const components =
            await getComponentsBySubDeviceId(subDeviceSelect.value);

        componentSelect.disabled = false;

        components.forEach(component => {
            componentSelect.appendChild(
                new Option(component.name, component.id)
            );
        });
    });

    // ===== EDIT MODE =====

    if (selectedDeviceId) {

        deviceSelect.value = selectedDeviceId;

        deviceSelect.dispatchEvent(
            new Event("change")
        );

        await new Promise(r => setTimeout(r, 50));

        subDeviceSelect.value = selectedSubDeviceId;

        subDeviceSelect.dispatchEvent(
            new Event("change")
        );

        await new Promise(r => setTimeout(r, 50));

        componentSelect.value = selectedComponentId;
    }
}