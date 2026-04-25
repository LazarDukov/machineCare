import {getAllTasks, completeTask} from "../api/tasksApi.js";
import {getOperatorsTechnicians} from "../api/usersApi.js";

const container = document.getElementById("tasks-container");

// 👉 взимаме machineName от URL
const params = new URLSearchParams(window.location.search);
const machineName = params.get("name");
const userSelect = document.getElementById("user-select");
const users = null;

loadTasks();

function loadTasks() {

    console.log("Machine:", machineName);

    getAllTasks(machineName).then(tasks => {

        console.log("Tasks:", tasks);

        if (!tasks.length) {
            container.innerHTML = "<p>Няма задачи</p>";
            return;
        }

        tasks.sort((a, b) => {
            return (
                (a.machineId || 0) - (b.machineId || 0) ||
                (a.deviceId || 0) - (b.deviceId || 0) ||
                (a.subDeviceId || 0) - (b.subDeviceId || 0) ||
                (a.componentId || 0) - (b.componentId || 0)
            );
        });

        const table = document.createElement("table");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.marginTop = "10px";

        const headerRow = document.createElement("tr");

        ["Машина", "Устройство", "Подустройство", "Компонент", "Задача", "Описание", "Служител", "Действие"]
            .forEach(text => {
                const th = document.createElement("th");
                th.textContent = text;
                th.style.border = "1px solid #ccc";
                th.style.padding = "8px";
                th.style.background = "#1b6bff";
                th.style.color = "white";
                headerRow.appendChild(th);
            });

        table.appendChild(headerRow);

        tasks.forEach(task => {

            const row = document.createElement("tr");

            row.appendChild(createCell(task.machineName));
            row.appendChild(createCell(task.deviceName));
            row.appendChild(createCell(task.subDeviceName));
            row.appendChild(createCell(task.componentName));
            row.appendChild(createCell(task.title));
            row.appendChild(createCell(task.description || "-"));

            // const input = document.createElement("input");
            // input.placeholder = "User...";
            userSelect.innerHTML = "<option value=''>-- Избери служител --</option>";
            getOperatorsTechnicians().then(users => {
            users.forEach(u => {
                const option = document.createElement("option");
                option.value = u.id;
                option.textContent = u.name;
                userSelect.appendChild(option);

                // const userCell = document.createElement("td");
                // userCell.appendChild(input);

                const btn = document.createElement("button");
                btn.textContent = "Приключи";
                btn.className = "button-click";

                btn.onclick = async () => {
                    const username = input.value.trim();

                    if (!username) {
                        alert("Въведи user!");
                        return;
                    }

                    const response = await completeTask(task.id, username);

                    if (response.ok) {
                        btn.disabled = true;
                        btn.textContent = "✔";
                        row.style.opacity = "0.5";
                    } else {
                        alert("Грешка");
                    }
                };

                const actionCell = document.createElement("td");
                actionCell.appendChild(btn);

                row.appendChild(userCell);
                row.appendChild(actionCell);

                table.appendChild(row);
            });

            container.innerHTML = "";
            container.appendChild(table);
        });
    }).catch(err => {
        console.error("Error loading tasks:", err);
        container.innerHTML = "<p>Грешка при зареждане на задачите.</p>";
    });

    function createCell(text) {
        const td = document.createElement("td");
        td.textContent = text || "-";
        td.style.border = "1px solid #ccc";
        td.style.padding = "8px";
        td.style.textAlign = "center";
        return td;
    }
}