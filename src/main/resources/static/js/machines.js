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

                    // 🔗 Edit link
                    const link = document.createElement("a");
                    link.href = `/machines/${machine.id}`;
                    link.textContent = machine.name;

                    // 🗑 Delete button
                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";
                    deleteBtn.style.marginLeft = "10px";

                    deleteBtn.addEventListener("click", (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        if (!confirm(`Delete machine "${machine.name}"?`)) {
                            return;
                        }

                        fetch(`/api/machines/${machine.id}`, {
                            method: "DELETE"
                        })
                            .then(res => {
                                if (!res.ok) {
                                    throw new Error("Delete failed");
                                }
                                // Reload list
                                loadMachines(type);
                            })
                            .catch(err => alert(err.message));
                    });

                    li.appendChild(link);
                    li.appendChild(deleteBtn);
                    list.appendChild(li);
                });
            })
            .catch(error => {
                alert(error.message);
            });
    }
});