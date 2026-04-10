import {addDevice} from "../api/devicesApi.js";

export async function submitEntity(name, selectDevice, selectSubDevice, message) {
    const params = new URLSearchParams(window.location.search);
    const machineName = params.get("name");
    if (!name) {
        message.style.color = "red";
        message.innerText = "Моля въведи име";
        return;
    }

    let currentType = document
        .getElementById("modal-title")
        .innerText
        .substring(6)
        .trim();

    let body = {name, machineName};
    console.log(currentType, body)
    try {
        if (currentType === "устройство") {
            await addDevice(body);
        }

        if (currentType === "подустройство") {
            if (!selectDevice) {
                alert("Избери устройство!");
                return;
            }

            body.deviceId = selectDevice;

            await fetch("/api/sub-devices/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(body)
            });
        }

        if (currentType === "компонент") {
            if (!selectDevice) {
                alert("Избери устройство!");
                return;
            }

            body.subDeviceId = selectSubDevice;

            await fetch("/api/components/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(body)
            });
        }

        message.style.color = "green";
        message.innerText = "Успешно добавено";

    } catch (err) {
        console.error(err);
        message.style.color = "red";
        message.innerText = "Грешка";
    }
}