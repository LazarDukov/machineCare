export async function createPart(body) {
    const res = await fetch("/api/parts/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        throw new Error("Error creating part");
    }

    return await res.json(); // ✅ THIS IS THE ID
}

export async function addPartToComponent(body) {
    console.log("addPartToComponent body:", body);
    const res = await fetch(`/api/parts/add-to-component`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        throw new Error("Грешка при връзване на част към компонент");
    }
}

export async function changePart(body) {
    console.log("first change part i vij bodito - ! ", body)
    const res = await fetch("/api/parts/change", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        throw new Error("Error changing part");
    }

    return await res.json(); // ✅ THIS IS THE ID
}


export async function changePartQuantityIntoComponent(body2) {
    console.log("addPartToComponent body:", body2);
    const res = await fetch(`/api/parts/change-quantity`, {
        method: "PUT",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body2)
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



