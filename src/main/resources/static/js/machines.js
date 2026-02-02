document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".machine-types button");
    const list = document.getElementById("machinesList");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const type = button.dataset.type;
            loadMachines(type);
        });
    });

    function loadMachines(type) {
        fetch(`/api/machines/${type}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load machines");
                }
                return response.json();
            })
            .then(machines => {
                list.innerHTML = ""; // clear old results

                if (machines.length === 0) {
                    list.innerHTML = "<li>No machines found</li>";
                    return;
                }

                machines.forEach(machine => {
                    const li = document.createElement("li");
                    const link = document.createElement("a");

                    link.href = `/machines/${machine.id}`;
                    link.textContent = machine.name;

                    li.appendChild(link);
                    list.appendChild(li);
                });
            })
            .catch(error => {
                alert(error.message);
            });
    }
});