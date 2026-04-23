export async function addPart(body) {
    return fetch("/api/parts/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    });
}

export async function addPartToComponent(componentId, partId, quantity) {
    const res = await fetch(`/api/components/add-part`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            componentId,
            partId,
            quantity
        })
    });

    if (!res.ok) {
        throw new Error("Грешка при връзване на част към компонент");
    }
}
export async function getAllParts() {
    const res = await fetch(`/api/parts/all`, {
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Грешка при зареждане на частите");
    }

    return res.json();
}

