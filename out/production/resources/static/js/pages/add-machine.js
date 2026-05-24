//TODO: Should remove this file when add methods in others
const form = document.getElementById("machine-form");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    const data = {
        name: formData.get("name"),
        identificationNumber: formData.get("identificationNumber"),
        manufacturer: formData.get("manufacturer"),
        model: formData.get("model"),
        type: "EXTRUDER" // 🔥 важно
    };

    try {
        const response = await fetch("/api/machines/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        });

        if (response.status === 201) {
            alert("Машината е добавена успешно!");

            // 👉 връщаме към списъка с екструдери
            window.location.href = "/extruders";
        } else {
            alert("Грешка при добавяне");
        }

    } catch (error) {
        console.error(error);
        alert("Сървърна грешка");
    }
});

