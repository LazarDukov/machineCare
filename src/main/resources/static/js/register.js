const form = document.querySelector(".form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const data = {
        username: formData.get("username"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        department: formData.get("department"),
        password: password
    };

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.status === 201) {
            alert("Registration successful!");
            window.location.href = "/login.html";
        } else {
            alert("Registration failed!");
        }

    } catch (error) {
        console.error(error);
        alert("Error connecting to server");
    }
});

