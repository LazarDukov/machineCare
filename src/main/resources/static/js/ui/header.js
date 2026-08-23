import { loadCurrentUser } from "../api/authApi.js";

export async function renderHeader() {
    const header = document.getElementById("appHeader");

    if (!header) {
        return;
    }

    const user = await loadCurrentUser();
    const isLoggedIn = !!user?.username;

    header.innerHTML = `
        <header class="top-header">
            <a href="/">
                <img src="/uploadedImages/logo.png" class="logo" alt="MachineCare">
            </a>

            ${isLoggedIn ? `
                <div class="profile-actions">
                    <button id="profileBtn" class="profile-action-btn">
                        Моят профил
                    </button>

                    <button id="logoutBtn" class="profile-action-btn logout-btn">
                        Изход
                    </button>
                </div>
            ` : ""}
        </header>
    `;

    document.getElementById("profileBtn")?.addEventListener("click", () => {
        window.location.href = "/profile";
    });

    document.getElementById("logoutBtn")?.addEventListener("click", async () => {
        const response = await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include"
        });

        if (response.ok) {
            window.location.replace("/");
        }
    });
}