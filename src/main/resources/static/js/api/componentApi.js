export function getComponentsBySubDeviceId(subDeviceId) {
    return fetch(`/api/components/sub-devices/${encodeURIComponent(subDeviceId)}`, {
        credentials: "include"
    }).then(r => r.json());
}