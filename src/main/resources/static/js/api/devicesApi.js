export function getDevices(machineName) {
    return fetch(`/api/devices/all/${encodeURIComponent(machineName)}`, {
        credentials: "include"
    }).then(r => r.json());
}

export function addDevice(body) {
    return fetch("/api/devices/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    });
}

