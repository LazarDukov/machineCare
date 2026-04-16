export function getFullStructure(machineName) {
    return fetch(`/api/machines/full-structure/${encodeURIComponent(machineName)}`, {
        credentials: "include"
    }).then(r => r.json());

}