
const container = document.getElementById("machines-container");

// 🔥 ВЗИМАШ по type от твоя endpoint
fetch("/api/machines/type/EXTRUDER", {
    credentials: "include"
})
    .then(res => {
        if (!res.ok) {
            throw new Error("Грешка при заявката");
        }
        return res.json();
    })
    .then(machines => {

        // ако няма машини
        if (machines.length === 0) {
            container.innerHTML = "<p>Няма добавени екструдери</p>";
            return;
        }

        machines.forEach(machine => {

            const btn = document.createElement("button");
            btn.className = "login";

            // ⚠️ важно: според твоето DTO
            btn.innerText = machine.name;

            btn.onclick = () => openMachine(machine.name);

            container.appendChild(btn);
        });

    })
    .catch(err => {
        console.error(err);
        alert("Грешка при зареждане на машините");
    });


// 👉 използваш твоя get by name endpoint
function openMachine(name) {
   window.location.href = "/machines/extruders/machine-details.html?name=" + encodeURIComponent(name);
}


// 👉 добавяне
function goToAddMachine() {
    window.location.href = "/machines/extruders/add";
}