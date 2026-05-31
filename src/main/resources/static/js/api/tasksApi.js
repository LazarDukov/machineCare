export function getAllTasks(machineName) {
    return fetch(`/api/tasks/all/${encodeURIComponent(machineName)}`, {
        credentials: "include"
    }).then(r => r.json());
}


