export function getComponentsBySubDeviceId(subDeviceId) {
    return fetch(`/api/components/sub-devices/${encodeURIComponent(subDeviceId)}`, {
        credentials: "include"
    }).then(r => r.json());
}

export function createComponent(body) {
    return fetch("/api/components/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    });
}
