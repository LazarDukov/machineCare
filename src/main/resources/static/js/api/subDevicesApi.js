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
