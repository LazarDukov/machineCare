import {addDevice} from "../api/devicesApi.js";

export async function submitEntity(name, selectId, message) {
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

    try {
        if (currentType === "устройство") {
            await addDevice(body);
        }

        if (currentType === "подустройство") {
            if (!selectId) {
                alert("Избери устройство!");
                return;
            }

            body.deviceId = selectId;

            await fetch("/api/sub-devices/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(body)
            });
        }

        if (currentType === "компонент") {
            if (!selectId) {
                alert("Избери подустройство!");
                return;
            }

            body.subDeviceId = Number(selectId);

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