document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("machineForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const machineId = document.getElementById("machineId")?.value;

        const payload = {
            name: document.getElementById("name").value,
            identificationNumber: document.getElementById("identificationNumber").value,
            manufacturer: document.getElementById("manufacturer").value,
            type: document.getElementById("type").value,
            model: document.getElementById("model").value
        };

        const isEdit = machineId && machineId.trim() !== "";

        const url = isEdit
            ? `/api/machines/${machineId}`
            : `/api/machines/add`;

        const method = isEdit ? "PUT" : "POST";

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) throw new Error("Save failed");
                window.location.href = "/machines";
            })
            .catch(err => alert(err.message));
    });
});