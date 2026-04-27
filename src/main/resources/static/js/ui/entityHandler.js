import {addDevice} from "../api/devicesApi.js";
import {addPart, addPartToComponent} from "../api/partsApi.js";
import {loadStructure} from "../pages/fullStructure.js";

export async function submitEntity(name, selectDevice, selectSubDevice, additionalInfo, message) {
    const params = new URLSearchParams(window.location.search);
    const machineName = params.get("name");
    const description = document.getElementById("extra-info-input")?.value.trim() || "";
    const sapNumber = document.getElementById("sap-number-input")?.value.trim() || "";

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

            // 1. създаваме част
            const res = await addPart(body);
            const partId = await res.json(); // ✅ ВЕЧЕ ИМА ID

            // 2. взимаме quantity
            const qty = parseInt(document.getElementById("part-quantity-input").value) || 0;

            // 3. взимаме componentId (от modal state)
            const componentId = window.currentComponentId;

            // 4. връзваме
            await addPartToComponent(componentId, partId, qty);


            // 5. refresh
            await loadStructure();
        }

        message.style.color = "green";
        message.innerText = "Успешно добавено";

// ✅ ТУК
        const modal = document.getElementById("add-entity-modal");
        if (modal) {
            modal.style.display = "none";
        }
    } catch (err) {
        console.error(err);
        message.style.color = "red";
        message.innerText = "Грешка";
    }
}
