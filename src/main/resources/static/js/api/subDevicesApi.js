

export function getSubDevicesByDeviceId(deviceId) {
    return fetch(`/api/sub-devices/device/${encodeURIComponent(deviceId)}`, {
        credentials: "include"
    }).then(r => r.json());
}
