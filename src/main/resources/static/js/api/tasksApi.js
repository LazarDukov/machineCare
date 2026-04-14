export function getAllTasks(machineName) {
    return fetch(`/api/tasks/all/${encodeURIComponent(machineName)}`, {
        credentials: "include"
    }).then(r => r.json());
}

export function completeTask(taskId, username) {
    return fetch(`/api/tasks/complete`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            taskId: taskId,
            username: username
        })
    });
}