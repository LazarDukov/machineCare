import { registerUser } from "../api/authApi.js";
import { renderHeader } from "../ui/header.js";

document.addEventListener("DOMContentLoaded", renderHeader);
const form = document.querySelector(".profile");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);



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