import { addDevice } from "../api/devicesApi.js";
import { addSubDevice } from "../api/subDevicesApi.js";
// import { addComponent } from "../api/componentsApi.js";

export async function submitEntity(type, name, selectId) {

    if (!name) {
        throw new Error("Моля въведи име");
    }

    if (type === "устройство") {
        return addDevice({ name });
    }

    if (type === "подустройство") {
        if (!selectId) throw new Error("Избери устройство!");
        return addSubDevice({ name, deviceId: selectId });
    }

    if (type === "компонент") {
        if (!selectId) throw new Error("Избери подустройство!");
        return addComponent({ name, subDeviceId: Number(selectId) });
    }

    throw new Error("Невалиден тип");
}