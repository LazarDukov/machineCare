export async function addPart(body) {
    return fetch("/api/parts/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    });
}

export async function addPartToComponent(componentId, partId, quantity) {
    fetch(`/api/parts/add-to-component`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            componentId,
            partId,
            quantity
        })
    }).then(r => {
        if (!r.ok) {
            throw new Error("Грешка при добавяне на частта");
        }
    });

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