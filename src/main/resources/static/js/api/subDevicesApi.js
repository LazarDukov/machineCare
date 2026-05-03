export function createSubDevice(body) {
    return fetch(`/api/sub-devices/add`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    });
}
