export async function createRepair(body) {
    console.log(body)
    const res = await fetch("/api/repair-jobs/add", {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)

    });

    if (!res.ok) {
        throw new Error("Грешка при създаване на нов протокол/ремонт");
    }
}
export async function getRepairs(machineName) {
    return fetch(`/api/repair-jobs/view-all/${encodeURIComponent(machineName)}`, {
        credentials: "include"
    }).then(r => r.json());

}

export async function changeRepair(body) {

    const response = await fetch("/api/repair-jobs/change", {
        method: "PUT", // или POST според Spring контролера
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });// или response.text(), ако backend не връща DTO
}