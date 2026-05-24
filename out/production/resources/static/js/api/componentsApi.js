export function getComponentsBySubDeviceId(subDeviceId) {
    return fetch(`/api/components/sub-devices/${encodeURIComponent(subDeviceId)}`, {
        credentials: "include"
    }).then(r => r.json());
}

export function createComponent(body) {
    return fetch("/api/components/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    });
}

export function changeComponent(body) {
    return fetch("/api/components/change", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    });
}

export async function deleteComponent(component) {
    console.log("принтирам тук: компонент - ", component)
    const res = await fetch("/api/components/delete", {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            id: component
        })
    });
    if (!res.ok) {
        throw new Error("Грешка при изтриване на частта");
    }
}
