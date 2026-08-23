import { renderHeader } from "../ui/header.js";

document.addEventListener("DOMContentLoaded", renderHeader);
document.getElementById("loginBtn")
    .addEventListener("click", () => {
        window.location.href = "/login";
    });

document.getElementById("registerBtn")
    .addEventListener("click", () => {
        window.location.href = "/register";
    });

document.getElementById("machinesBtn")
    .addEventListener("click", () => {
        window.location.href = "/machines";
    });