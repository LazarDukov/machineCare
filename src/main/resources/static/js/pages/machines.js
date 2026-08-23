import { renderHeader } from "../ui/header.js";

document.addEventListener("DOMContentLoaded", renderHeader);
window.onload = function () {
}

document.getElementById("extrudersBtn")
    .addEventListener("click", () => {
        window.location.href = "/machines/extruders";
    });

document.getElementById("packagingBtn")
    .addEventListener("click", () => {
        window.location.href = "/machines/packaging";
    });

document.getElementById("othersBtn")
    .addEventListener("click", () => {
        window.location.href = "/machines/others";
    });

