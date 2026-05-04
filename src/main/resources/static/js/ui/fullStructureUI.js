export function createCell(text) {
    const td = document.createElement("td");
    td.textContent = text || "-";
    td.style.border = "1px solid #ccc";
    td.style.padding = "8px";
    td.style.textAlign = "center";
    return td;
}

//
// ================= DEVICE =================
// 👉 само показва име (без бутони)
//
export function createDeviceCell(device) {
    const td = document.createElement("td");

    td.innerHTML = `<div>${device.name}</div>`;

    style(td);
    return td;
}

//
// ================= SUB DEVICE =================
// 👉 бутон: Добави ново подустройство
//
export function createSubDeviceCell(sd, onAddSubDevice) {
    const td = document.createElement("td");

    td.innerHTML = `
        <div>${sd.name}</div>
        <button class="button-click">Добави ново подустройство</button>
    `;

    td.querySelector("button").onclick = () => onAddSubDevice(sd.id);

    style(td);
    return td;
}

//
// ================= COMPONENT =================
// 👉 2 бутона:
// - нов компонент
// - нова част
//
export function createComponentCell(component, onAddComponent, onChangeComponent,onAddPart) {
    const td = document.createElement("td");

    td.innerHTML = `
        <div>${component.name}</div>
        <div>${component.additionalInfo}</div>

        <button class="button-click">Добави нов компонент</button>
        <br>
        <button class="button-click">Промени компонент</button>
        <br>
        <button class="button-click">Добави нова част към този компонент</button>
    `;

    const buttons = td.querySelectorAll("button");

    // 👉 1. добави компонент (на същото ниво)
    if (buttons[0]) {
        buttons[0].onclick = () => onAddComponent(component.id);
    }

    if (buttons[1]) {
        buttons[1].onclick = () => onChangeComponent(component);
    }
    // 👉 2. добави част към компонента
    if (buttons[2]) {
        buttons[2].onclick = () => onAddPart(component.id);
    }

    style(td);
    return td;
}

//
// ================= PART =================
// 👉 само показ + edit
//
export function createPartCell(cp, index, onEdit) {
    const td = document.createElement("td");

    td.innerHTML = `
        <div>${index + 1}. ${cp.partName}</div>
        <div style="font-size:12px;color:gray;">
            ${cp.quantity} бр | SAP: ${cp.sapNumber}
        </div>
        <button class="button-click">Промени</button>
        <button class="button-click">Изтрий</button>
    `;

    td.querySelector("button").onclick = () => onEdit(cp);
    // td.querySelector("button").onclick = () => onDelete(cp);

    style(td);
    return td;
}

//
// ================= STYLE =================
//
function style(td) {
    td.style.border = "1px solid #ccc";
    td.style.padding = "8px";
    td.style.textAlign = "center";
}
