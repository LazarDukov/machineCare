export async function getMachinesByType(type) {
    const res = await fetch(`/api/machines/type/${type}`, {
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Грешка при заявката");
    }

    return res.json();
}