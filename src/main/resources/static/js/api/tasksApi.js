export function getAllTasks(machineName) {
    return fetch(`/api/tasks/all/${encodeURIComponent(machineName)}`, {
        credentials: "include"
    }).then(r => r.json());
}

export function updateTask(data) {
    return fetch(`/api/tasks/update`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(data)
    });
}

export async function deleteTask(task) {
    console.log("Deleting task:", task);
    const res = await fetch(`/api/tasks/delete`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            id: task.id
        })
    });
    if (!res.ok) {
        throw new Error("Грешка при изтриване на taska");
    }
}
