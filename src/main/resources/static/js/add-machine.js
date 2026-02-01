document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("machineForm");

    form.addEventListener("submit", function (event) {

        console.log("after prevent default");
        const payload = {

            name: document.getElementById("name").value,
            identificationNumber: document.getElementById("identificationNumber").value,
            manufacturer: document.getElementById("manufacturer").value,
            type: document.getElementById("type").value,
            model: document.getElementById("model").value

        };
        console.log("before fetching");
        fetch("/api/machines", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(payload)

        })
            .then(response => {
                console.log("im in response");
                if (!response.ok) {
                    console.log("RESPONSE NOT OK!");
                    throw new Error("Failed to create machine");
                }
                console.log("RESPONSE OK!");
                window.location.href = "/machines";

            })

    });
});

