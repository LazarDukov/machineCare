export function getSubDevices() {
    return fetch(`/api/sub-devices/add`, {
        credentials: "include"
    }).then(r => r.json());
}
