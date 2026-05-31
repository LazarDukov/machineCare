import {getAllTasks} from "../api/tasksApi.js";
import {completeTask} from "../api/taskHistoryApi.js";
import {getOperatorsTechnicians} from "../api/usersApi.js";
import {openEmployeeModal} from "../ui/modals.js";

const container = document.getElementById("tasks-container");

// 👉 взимаме machineName от URL
const params = new URLSearchParams(window.location.search);
const machineName = params.get("name");
let selectedUsersForTask = [];

loadTasks();

async function loadTasks() {
    try {
        console.log("Machine:", machineName);

        const [tasks, rawUsers] = await Promise.all([
            getAllTasks(machineName),
            getOperatorsTechnicians()
        ]);

        console.log("Tasks:", tasks);
        console.log("Raw users:", rawUsers);

        const users = rawUsers;

        if (!tasks.length) {
            container.innerHTML = "<p>Няма задачи</p>";
            return;
        }

        // ✅ Sorting
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

        [
            "Машина",
            "Устройство",
            "Подустройство",
            "Компонент",
            "Задача",
            "Описание",
            "Период",
            "Таймер",
            "Действие"
        ].forEach(text => {
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

            const periodLabelMap = {
                DAY: "Ден",
                WEEK: "Седмица",
                MONTH: "Месец"
            };

            const periodText = task.periodEnum
                ? `${task.repeatedAfter || ""} ${periodLabelMap[task.periodEnum] || task.periodEnum}`
                : "-";

            row.appendChild(createCell(periodText.trim()));

            // ✅ Timer cell
            const timerCell = document.createElement("td");
            timerCell.style.textAlign = "center";
            timerCell.style.padding = "8px";

            row.appendChild(timerCell);

            // START TIMER
            const timer = startElapsedTimer(task, timerCell);
            console.log("createdAt:", task.createdAt);
            console.log("parsed:", new Date(task.createdAt));
            console.log("now:", new Date());
            // ✅ Employee dropdown


            // ✅ Complete button
            const btn = document.createElement("button");
            btn.textContent = "Приключи";
            btn.className = "button-click";

            btn.onclick = async () => {

                const result = await openEmployeeModal(users);

                let body = {
                    taskId: task.id,
                    employees: result.ids,
                    note: result.note
                };
                console.log(body)
                const response =
                    await completeTask(
                        body
                    );

                if (response.ok) {

                    timer.restart();

                    btn.textContent = "✔";

                    setTimeout(() => {
                        btn.textContent = "Приключи";
                    }, 1000);

                } else {

                    alert("Грешка при приключване");
                }
            };

            const actionCell = document.createElement("td");
            actionCell.appendChild(btn);
            row.appendChild(actionCell);
            table.appendChild(row);
        });

        container.innerHTML = "";
        container.appendChild(table);

    } catch (err) {
        console.error("Error loading tasks:", err);
        container.innerHTML = "<p>Грешка при зареждане на задачите.</p>";
    }

}

// ==================================================
// Helpers
// ==================================================

function createCell(text) {
    const td = document.createElement("td");
    td.textContent = text || "-";
    td.style.border = "1px solid #ccc";
    td.style.padding = "8px";
    td.style.textAlign = "center";
    return td;
}

// ==================================================
// Task Timer
// ==================================================
function startElapsedTimer(task, element) {

    let startDate = new Date(task.createdAt);

    function getDueDate() {
        const dueDate = new Date(startDate);

        switch (task.periodEnum) {
            case "DAY":
                dueDate.setDate(dueDate.getDate() + task.repeatedAfter);
                break;

            case "WEEK":
                dueDate.setDate(dueDate.getDate() + task.repeatedAfter * 7);
                break;

            case "MONTH":
                dueDate.setMonth(dueDate.getMonth() + task.repeatedAfter);
                break;
        }

        return dueDate;
    }

    function update() {

        const now = new Date();
        const dueDate = getDueDate();

        let diff = dueDate - now;
        const overdue = diff < 0;

        diff = Math.abs(diff);

        const totalSeconds = Math.floor(diff / 1000);

        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        element.textContent =
            `${overdue ? "-" : ""}${days}д ` +
            `${String(hours).padStart(2, "0")}:` +
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`;

        element.style.color = overdue ? "red" : "green";
    }

    update();

    const intervalId = setInterval(update, 1000);

    return {
        restart() {
            startDate = new Date();
            update();
        },
        destroy() {
            clearInterval(intervalId);
        }
    };
}