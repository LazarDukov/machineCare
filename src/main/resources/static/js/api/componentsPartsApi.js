

export async function getPartsByComponentId(componentId) {
    const res = await fetch(`/api/components-parts/${encodeURIComponent(componentId)}/parts`, {
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Грешка при зареждане на части");
    }

    return res.json(); // 🔥 ТОВА ЛИПСВА
}

export async function deletePartFromComponent(p, c) {
    console.log("принтирам тук: компонент - " , c)
    console.log("принтирам тук: част - " , p)
    const res = await fetch("/api/components-parts/delete", {

        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                partId: p.partId,
                componentId: c
            }
        )
    });

    if (!res.ok) {
        throw new Error("Грешка при изтриване на частта");
    }

}