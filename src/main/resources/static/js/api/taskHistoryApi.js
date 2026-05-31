// TODO: This method isnt implemented yet!
export function completeTask(body) {
    console.log(body)
    return fetch(`/api/task-history/complete-task`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    });
}