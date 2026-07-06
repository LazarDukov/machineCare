export async function registerUser(data) {
    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Registration failed");
    }

    return response;
}

export async function loginUser(data) {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response;
}
document.addEventListener("DOMContentLoaded", () => {
    loadCurrentUser();
});
const AUTH_API = "/api/auth/user-status";

let currentUser = null;

/**
 * Зарежда текущия потребител от Spring Security
 */
export async function loadCurrentUser() {
    try {

        const response = await fetch(AUTH_API, {
            method: "GET",
            credentials: "include" // важно ако ползваш session/cookie auth
        });

        if (!response.ok) {

            currentUser = { authenticated: false };
            applyAuthUI();
            return null;
        }

        currentUser = await response.json();
        applyAuthUI();
        return currentUser;

    } catch (error) {
        console.error("Auth error:", error);

        currentUser = { authenticated: false };
        applyAuthUI();
        return null;
    }
}

/**
 * Показва/скрива елементи според логина и ролите
 */
function applyAuthUI() {
    const authOnly = document.querySelectorAll(".auth-only");
    const guestOnly = document.querySelectorAll(".guest-only");
    const adminOnly = document.querySelectorAll(".admin-only");

    const isAuth = !!currentUser?.username;
    const roles = currentUser?.roles || [];

    // auth-only
    authOnly.forEach(el => {
        el.style.display = isAuth ? "" : "none";
    });

    // guest-only
    guestOnly.forEach(el => {
        el.style.display = isAuth ? "none" : "";
    });

    // admin-only
    adminOnly.forEach(el => {
        el.style.display = roles.includes("ADMIN") ? "" : "none";
    });
}

