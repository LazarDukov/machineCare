import {addDevice} from "../api/devicesApi.js";
import {addPart} from "../api/partsApi.js";

export async function submitEntity(name, selectDevice, selectSubDevice, additionalInfo, message) {
    const params = new URLSearchParams(window.location.search);
    const machineName = params.get("name");
    const description = document.getElementById("part-description-input")?.value.trim() || "";
    const sapNumber = document.getElementById("part-sap-input")?.value.trim() || "";

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
    let body = {name, machineName, additionalInfo};

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

            body.subDeviceId = selectSubDevice
            body.additionalInfo = additionalInfo

            await fetch("/api/components/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(body)
            });
        }
        if (currentType === "част") {

            body.description = description;
            body.sapNumber = sapNumber;

            await addPart(body);
        }

        message.style.color = "green";
        message.innerText = "Успешно добавено";

    } catch (err) {
        console.error(err);
        message.style.color = "red";
        message.innerText = "Грешка";
    }
}
