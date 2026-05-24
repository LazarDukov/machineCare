export function getFullStructure(machineName) {
    return fetch(`/api/machines/full-structure/${encodeURIComponent(machineName)}`, {
        credentials: "include"
    }).then(r => r.json());

}

export async function getMachineByName(name) {
    const res = await fetch(`/api/machines/name/${encodeURIComponent(name)}`);

    if (!res.ok) {
        throw new Error("Машината не е намерена");
    }

    return res.json();
}
export async function getMachinesByType(type) {
    const res = await fetch(`/api/machines/type/${encodeURIComponent(type)}`);

    if (!res.ok) {
        throw new Error("Машината не е намерена");
    }

    return res.json();
}