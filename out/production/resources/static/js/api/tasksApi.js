export function getAllTasks(machineName) {
    return fetch(`/api/tasks/all/${encodeURIComponent(machineName)}`, {
        credentials: "include"
    }).then(r => r.json());
}


// TODO: This method isnt implemented yet!
export function completeTask(taskId, userId) {
    return fetch(`/api/tasks/complete-task/${encodeURIComponent(taskId)}/${encodeURIComponent(userId)}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            taskId: taskId,
            userId: userId
        })
    });
}