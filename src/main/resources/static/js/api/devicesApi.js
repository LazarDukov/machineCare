export function getDevices(machineName) {
    return fetch(`/api/devices/all/${encodeURIComponent(machineName)}`, {
        credentials: "include"
    }).then(r => r.json());
}

export function createDevice(body) {
    return fetch("/api/devices/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    });
}

export async function deleteDevice(device) {
    console.log("принтирам тук: podustrojstwo - ", device)
    const res = await fetch("/api/devices/delete", {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            id: device
        })
    });
    if (!res.ok) {
        throw new Error("Грешка при изтриване на ustr");
    }
}