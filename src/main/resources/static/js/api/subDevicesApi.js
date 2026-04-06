export function getSubDevicesByDeviceId(deviceId) {
    return fetch(`/api/sub-devices/device/${deviceId}`, {
        credentials: "include"
    }).then(r => r.json());
}