const params = new URLSearchParams(window.location.search);
const machineName = params.get("name");

// показваме името
document.getElementById("machine-name").innerText = machineName || "Машина";

// 👉 извикване към API
if (machineName) {
    fetch(`/api/machines/name/${encodeURIComponent(machineName)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Машината не е намерена");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            // 🔹 показване на информация
            document.getElementById("machine-info").innerHTML = `
                <p><strong>Име:</strong> ${data.name}</p>
                <p><strong>Тип:</strong> ${data.type}</p>
                <p><strong>Описание:</strong> ${data.description || "Няма"}</p>
            `;

            // 🔹 зареждане на URL (ако имаш поле)
            if (data.url) {
                document.getElementById("machine-frame").src = data.url;
            }
        })
        .catch(err => {
            document.getElementById("machine-info").innerHTML =
                `<p style="color:red;">${err.message}</p>`;
        });
}

// 👉 навигация
function goToSpareParts() {
    window.location.href = "/spare-parts.html?name=" + encodeURIComponent(machineName);
}

function goToRepairs() {
    window.location.href = "/repairs.html?name=" + encodeURIComponent(machineName);
}

function goToMaintenance() {
    window.location.href = "/maintenance.html?name=" + encodeURIComponent(machineName);
}