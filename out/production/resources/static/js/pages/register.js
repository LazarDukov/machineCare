import { registerUser } from "../api/authApi.js";

const form = document.querySelector(".register-form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // 👉 validation остава тук
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
        await registerUser(data);

        alert("Registration successful!");
        window.location.href = "/login";

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});