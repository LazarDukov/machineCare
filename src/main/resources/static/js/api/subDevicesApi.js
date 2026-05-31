export function getSubDevicesByDeviceId(deviceId) {
    return fetch(`/api/sub-devices/device/${encodeURIComponent(deviceId)}`, {
        credentials: "include"
    }).then(r => r.json());
}

export function createSubDevice(body) {
    return fetch(`/api/sub-devices/add`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    });
}

export function changeSubDevice(subDevice) {
    return fetch("/api/sub-devices/change", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            id: subDevice.id,
            name: subDevice.name
        })
    });
}

export async function deleteSubDevice(subDevice) {
    console.log("принтирам тук: podustrojstwo - ", subDevice)
    const res = await fetch("/api/sub-devices/delete", {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            id: subDevice
        })
    });
    if (!res.ok) {
        throw new Error("Грешка при изтриване на podustrojstwo");
    }
}
