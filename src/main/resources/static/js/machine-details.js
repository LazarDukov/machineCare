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


function openEntityModal(type) {
    currentType = type;

    const modal = document.getElementById("add-entity-modal");
    const title = document.getElementById("modal-title");
    const selectContainer = document.getElementById("relation-select-container");
    const select = document.getElementById("relation-select");

    modal.style.display = "flex";
    select.innerHTML = "";

    if (type === "device") {
        title.innerText = "Добави устройство";
        selectContainer.style.display = "none";
    } else if (type === "subDevice") {
        title.innerText = "Добави подустройство";
        selectContainer.style.display = "block";
        loadDevices(select);
    } else if (type === "component") {
        title.innerText = "Добави компонент";
        selectContainer.style.display = "block";

        loadSubDevices(select);
    }

    document.getElementById("entity-name-input").value = "";
    document.getElementById("entity-message").innerText = "";
}

function loadDevices(select) {
    fetch(`/api/devices/all/${encodeURIComponent(machineName)}`, {
        credentials: "include"
    })
        .then(res => res.json())
        .then(devices => {
            if (!devices.length) {
                select.innerHTML = "<option>Няма устройства</option>";
                return;
            }

            devices.forEach(device => {
                const option = document.createElement("option");

                option.value = device.id;      // 👉 ВАЖНО: ID
                option.textContent = device.name; // 👉 показваш име

                select.appendChild(option);
            });
        });
}

function loadSubDevices(select) {
    fetch(`/api/sub-devices/all/${encodeURIComponent(deviceId)}`, {
        credentials: "include"
    })
        .then(res => res.json())
        .then(subDevices => {

            if (!subDevices.length) {
                select.innerHTML = "<option value=''>Няма подустройства</option>";
                return;
            }

            subDevices.forEach(sd => {
                const option = document.createElement("option");
                const deviceId = new URLSearchParams(window.location.search).get("deviceId");
                option.value = sd.id;      // 👉 ВАЖНО: ID
                option.textContent = sd.name; // 👉 показваш име

                select.appendChild(deviceId);
            });
        });
}

function closeModal(element) {
    const modal = element.closest(".modal");
    modal.style.display = "none";

}

function submitEntity() {
    const input = document.getElementById("entity-name-input");
    const message = document.getElementById("entity-message");
    const selectedId = document.getElementById("relation-select").value;

    const name = input.value.trim();

    if (!name) {
        message.style.color = "red";
        message.innerText = "Моля въведи име";
        return;
    }

    let url = "";
    let body = {
        name: name,
        machineName: machineName
    };

    if (currentType === "device") {
        url = "/api/devices/add";
    }

    if (currentType === "subDevice") {

        if (!selectedId) {
            alert("Избери устройство!");
            return;
        }

        url = "/api/sub-devices/add";
        body.deviceId = Number(selectedId);
    }

    if (currentType === "component") {
        if (!selectedId) {
            alert("Избери подустройство!");
            return;
        }

        url = "/api/components/add";
        body.subDeviceId = Number(selectedId);
    }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(body)   // ✅ използваш body-то
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Грешка");
            }
            return res.text();
        })
        .then(() => {
            message.style.color = "green";
            message.innerText = "Успешно добавено";
        })
        .catch(err => {
            console.error(err);
            message.style.color = "red";
            message.innerText = "Грешка";
        });
}