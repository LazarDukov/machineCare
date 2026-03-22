const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(loginForm);

    const data = {
        username: formData.get("username"),
        password: formData.get("password")
    };

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", // 🔥 МНОГО ВАЖНО
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.location.href = "/machines";
        } else {
            alert("Invalid credentials");
        }

    } catch (error) {
        console.error(error);
        alert("Server error");
    }
});