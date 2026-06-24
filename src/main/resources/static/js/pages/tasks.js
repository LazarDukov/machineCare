import {deleteTask, getAllTasks, updateTask} from "../api/tasksApi.js";
import {completeTask} from "../api/taskHistoryApi.js";
import {getOperatorsTechnicians} from "../api/usersApi.js";
import {openEmployeeModal} from "../ui/modals.js";

const container = document.getElementById("tasks-container");

// Взимаме machineName от URL
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
            container.innerHTML = `<div class="structure-empty">Няма задачи</div>`;
            return;
        }

        // Sorting
        tasks.sort((a, b) => {
            return (
                (a.machineId || 0) - (b.machineId || 0) ||
                (a.deviceId || 0) - (b.deviceId || 0) ||
                (a.subDeviceId || 0) - (b.subDeviceId || 0) ||
                (a.componentId || 0) - (b.componentId || 0)
            );
        });

        const table = document.createElement("table");
        table.className = "structure-table";

        const thead = document.createElement("thead");
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
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

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

            // Timer cell
            const timerCell = document.createElement("td");
            timerCell.className = "task-timer-cell";

            row.appendChild(timerCell);

            // START TIMER
            const timer = startElapsedTimer(task, timerCell);
            console.log("createdAt:", task.createdAt);
            console.log("parsed:", new Date(task.createdAt));
            console.log("now:", new Date());

            // Complete button
            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Приключи";
            completeBtn.className = "button-click";

            completeBtn.onclick = async () => {

                const result = await openEmployeeModal(users);

                let body = {
                    taskId: task.id,
                    employees: result.ids,
                    note: result.note
                };

                const response = await completeTask(body);

                if (response.ok) {

                    timer.restart();

                    completeBtn.textContent = "✔";

                    setTimeout(() => {
                        completeBtn.textContent = "Приключи";
                    }, 1000);

                } else {
                    alert("Грешка при приключване");
                }
            };

            // Edit button
            const editBtn = document.createElement("button");
            editBtn.textContent = "Промени";
            editBtn.className = "button-click";

            editBtn.onclick = async () => {

                const updatedTask = await openEditTaskModal(task);

                if (!updatedTask) {
                    console.log("Редакцията е отказана");
                    return;
                }

                await updateTask(updatedTask);
                await loadTasks();
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Изтрий";
            deleteBtn.className = "button-click";

            deleteBtn.onclick = async () => {

                const confirmed = confirm(
                    `Сигурни ли сте, че искате да изтриете задачата "${task.title}"?`
                );

                if (!confirmed) return;
                console.log("Deleting task:", task);
                await deleteTask(task);

                await loadTasks();
            };

            const actionCell = document.createElement("td");

            const buttonsWrapper = document.createElement("div");
            buttonsWrapper.className = "task-actions";

            buttonsWrapper.appendChild(completeBtn);
            buttonsWrapper.appendChild(editBtn);
            buttonsWrapper.appendChild(deleteBtn);

            actionCell.appendChild(buttonsWrapper);

            row.appendChild(actionCell);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);

        container.innerHTML = "";
        container.appendChild(table);

    } catch (err) {
        console.error("Error loading tasks:", err);
        container.innerHTML = `
            <p class="structure-error">
                Грешка при зареждане на задачите.
            </p>
        `;
    }

}

// ==================================================
// Helpers
// ==================================================

function createCell(text) {
    const td = document.createElement("td");
    td.textContent = text || "-";
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
