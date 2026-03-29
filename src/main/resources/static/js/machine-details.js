const params = new URLSearchParams(window.location.search);
const machineName = params.get("name");


// показваме името
document.getElementById("machine-name").innerText = machineName || "Машина";
console.log("Търсим машина с име:", machineName);
// 👉 извикване към API
if (machineName) {

    fetch(`/api/machines/name/${encodeURIComponent(machineName)}`)
        .then(response => {
            console.log("Отговор от API:", response);

            if (!response.ok) {
                throw new Error("Машината не е намерена");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            // 🔹 показване на информация
            document.getElementById("machine-info").innerHTML = `
                <p><strong>Идентификационен номер:</strong> ${data.identificationNumber}</p>
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

function openDevicesModal() {
    const modal = document.getElementById("devices-modal");
    const container = document.getElementById("devices-container");

    modal.style.display = "block";
    container.innerHTML = "<p>Зареждане...</p>";

    // 👉 взимаме machineName от URL (ако вече го имаш, ползвай него)
    const params = new URLSearchParams(window.location.search);

    fetch(`/api/devices/all/${encodeURIComponent(machineName)}`, {
        credentials: "include"
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Грешка при зареждане");
            }
            return res.json();
        })
        .then(devices => {

            if (!devices || devices.length === 0) {
                container.innerHTML = "<p>Няма добавени устройства</p>";
                return;
            }

            container.innerHTML = "";

            devices.forEach(device => {
                const div = document.createElement("div");
                div.textContent = device.name; // според DTO-то ти
                div.style.padding = "10px";
                div.style.background = "#eee";
                div.style.borderRadius = "8px";

                container.appendChild(div);
            });

        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "<p style='color:red;'>Грешка при зареждане</p>";
        });
}

function closeDevicesModal() {
    document.getElementById("devices-modal").style.display = "none";
}

function openAddDeviceModal() {
    document.getElementById("add-device-modal").style.display = "block";
    document.getElementById("device-name-input").value = "";
    document.getElementById("add-device-message").innerText = "";
}

function closeAddDeviceModal() {
    document.getElementById("add-device-modal").style.display = "none";
}

function submitDevice() {
    const input = document.getElementById("device-name-input");
    const message = document.getElementById("add-device-message");

    const deviceName = input.value.trim();

    if (!deviceName) {
        message.style.color = "red";
        message.innerText = "Моля въведи име";
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const machineName = params.get("name");

    fetch("/api/devices/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            name: deviceName,
            machineName: machineName
        })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Грешка при добавяне");
            }
            return res.text();
        })
        .then(data => {
            message.style.color = "green";
            message.innerText = "Устройството е добавено успешно";

            input.value = "";

            // по желание: затваря след 1 секунда
            setTimeout(() => {
                closeAddDeviceModal();
            }, 1000);
        })
        .catch(err => {
            console.error(err);
            message.style.color = "red";
            message.innerText = "Грешка при добавяне";
        });
}