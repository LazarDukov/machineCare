export function renderMachines(container, machines) {

    if (!machines || machines.length === 0) {
        container.innerHTML = "<p>Няма добавени екструдери</p>";
        return;
    }

    container.innerHTML = "";

    machines.forEach(machine => {
        const btn = document.createElement("button");
        btn.className = "button-click";
        btn.innerText = machine.name;

        btn.addEventListener("click", () => {
            window.location.href =
                "/machines/extruders/machine-details.html?name=" +
                encodeURIComponent(machine.name);
        });

        container.appendChild(btn);
    });
}
