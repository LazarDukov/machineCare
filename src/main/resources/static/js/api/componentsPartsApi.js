export async function getPartsByComponentId(componentId){
    const res = await fetch(`/api/components-parts/${encodeURIComponent(componentId)}/parts`, {
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Грешка при зареждане на частите");
    }

    return res.json();
}