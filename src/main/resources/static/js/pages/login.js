import {loginUser} from "../api/authApi.js";

const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(loginForm);

    const data = {
        username: formData.get("username"),
        password: formData.get("password")
    };

    try {
        await loginUser(data);

        alert("Login successful!");
        window.location.href = "/machines";

    } catch (error) {
        console.error(error);
        alert(error.message);
    }

})
;