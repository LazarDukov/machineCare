export function getFullStructure(machineName) {
    return fetch(`/api/machines/name/${encodeURIComponent(machineName)}/structure`, {
        credentials: "include"
    }).then(r => r.json());

}