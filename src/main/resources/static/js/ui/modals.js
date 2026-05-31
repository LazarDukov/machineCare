import {changeDevice, createDevice, deleteDevice} from "../api/devicesApi.js";
import {changeSubDevice, createSubDevice, deleteSubDevice} from "../api/subDevicesApi.js";
import {createComponent, changeComponent, deleteComponent} from "../api/componentsApi.js";
import {addPartToComponent, changePart, changePartQuantityIntoComponent, createPart} from "../api/partsApi.js";
import {deletePartFromComponent} from "../api/componentsPartsApi.js";

let selectedDevice = null;
let selectedSubDevice = null;
let selectedComponentInModal = null;

export function openAddDevice() { // ОТВАРЯМ МОДАЛА ЗА ДОБАВЯНЕ НА УСТРОЙСТВО
    toggle("device-modal");
    document.getElementById("device-modal").style.display = "flex";
}

export function initDevice() { // ТУК ДОБАВЯМ УСТРОЙСТВО
    const machineName = new URLSearchParams(window.location.search).get("name");
    document.getElementById("save-device-btn").onclick = async () => {
        const name = document.getElementById("device-name-input").value.trim();

        if (!name) return;
        let body = {name, machineName};
        await createDevice(body);

        document.getElementById("device-modal").style.display = "none";

        await refreshPage(); // refresh
    };
}

export function openAddSubDevice(deviceId) { // ОТВАРЯМ МОДАЛА ЗА ДОБАВЯНЕ НА ПОДУСТРОЙСТВО
    selectedDevice = deviceId;
    toggle("subDevice-modal");
}

export function initSubDevice() { // ТУК ДОБАВЯМ ПОДУСТРОЙСТВО

    document.getElementById("save-subDevice-btn").onclick = async () => {
        const name = document.getElementById("subDevice-name-input").value.trim();

        if (!name) return;
        let body = {name, deviceId: selectedDevice};
        await createSubDevice(body);

        document.getElementById("subDevice-modal").style.display = "none";

        await refreshPage();// refresh
    };
}

export function openAddComponent(subDeviceId) { //ОТВАРЯМ МОДАЛА ЗА ДОБАВЯНЕ НА КОМПОНЕНТ
    selectedSubDevice = subDeviceId;
    toggle("component-modal");
}

export function initComponent() { // ТУК ДОБАВЯМ КОМПОНЕНТ

    document.getElementById("save-component-btn").onclick = async () => {
        const name = document.getElementById("component-name-input").value.trim();


        if (!name) return;
        let body = {name, subDeviceId: selectedSubDevice};
        await createComponent(body);

        document.getElementById("component-modal").style.display = "none";

        await refreshPage(); // refresh
    };
}

export function openEditComponent(component) { // ОТВАРЯМ МОДАЛА ЗА РЕДАКТИРАНЕ НА ЧАСТ

    selectedComponentInModal = component;

    document.getElementById("component-name-input-change").value = selectedComponentInModal.name;

    toggle("component-modal-change");
}

export function initChangeComponent() {
    // ОТВАРЯМ МОДАЛА ЗА РЕДАКТИРАНЕ НА КОМПОНЕНТ

    document.getElementById("save-component-change-btn").onclick = async () => {
        const name = document.getElementById("component-name-input-change").value.trim();

        let body = {
            id: selectedComponentInModal.id,
            name: name
        };
        await changeComponent(body);

        document.getElementById("component-modal-change").style.display = "none";

        await refreshPage(); // refresh
    };
}

export function openAddPartToComponent(componentId) { // ОТВАРЯМ МОДАЛА ЗА ДОБАВЯНЕ НА ЧАСТ КЪМ КОМПОНЕНТ
    selectedComponentInModal = componentId;

    toggle("part-modal");

}

export function initPartModal() { // ТУК ДОБАВЯМ ЧАСТ КЪМ КОМПОНЕНТ

    document.getElementById("save-part-btn").onclick = async () => {
        const name = document.getElementById("part-name-input").value.trim();
        const description = document.getElementById("part-description-input").value.trim();
        const sapNumber = document.getElementById("part-sap-number-input").value.trim();
        const quantity = document.getElementById("part-quantity-input").value.trim();


        if (!name) return;
        let body = {
            name,
            description: description,
            sapNumber: sapNumber
        };
        let createdPart = await createPart(body);
        let body2 = {
            componentId: selectedComponentInModal,
            partId: createdPart,
            quantity: quantity
        };
        await addPartToComponent(body2);

        document.getElementById("part-modal").style.display = "none";

        await refreshPage(); // refresh
    };
}

let selectedPart = null;

export function openEditPart(part, componentId) { // ОТВАРЯМ МОДАЛА ЗА РЕДАКТИРАНЕ НА ЧАСТ

    selectedPart = part;
    selectedComponentInModal = componentId;
    document.getElementById("part-name-input-change").value = selectedPart.partName;
    document.getElementById("part-description-input-change").value = selectedPart.description;
    document.getElementById("part-sap-number-input-change").value = selectedPart.sapNumber;
    document.getElementById("part-quantity-input-change").value = selectedPart.quantity;
    toggle("change-part-modal");
}


export function initEditPartModal() { // ТУК РЕДАКТИРАМ ЧАСТ КЪМ КОМПОНЕНТ И КОЛИЧЕСТВО

    document.getElementById("save-changed-part-btn").onclick = async () => {
        const name = document.getElementById("part-name-input-change").value.trim();
        const description = document.getElementById("part-description-input-change").value.trim();
        const sapNumber = document.getElementById("part-sap-number-input-change").value.trim();
        const quantity = document.getElementById("part-quantity-input-change").value.trim();
        let body = {
            id: selectedPart.partId,
            partName: name,
            description: description,
            sapNumber: sapNumber
        };


        let body2 = {
            componentId: selectedComponentInModal,
            partId: selectedPart.partId,
            quantity: quantity
        };


        const partChanged =
            selectedPart.partName !== name ||
            selectedPart.description !== description ||
            selectedPart.sapNumber !== sapNumber;

        const quantityChanged =
            selectedPart.quantity !== quantity;

        if (partChanged) {
            await changePart(body);
        }

        if (quantityChanged) {
            await changePartQuantityIntoComponent(body2);
        }

        document.getElementById("change-part-modal").style.display = "none";

        await refreshPage(); // refresh
    };
}

export function openDeletePart(part, componentId) {
    return new Promise((resolve) => {

        const modal = document.getElementById("delete-part-modal");
        const yesBtn = document.getElementById("delete-part-btn");
        const noBtn = document.getElementById("not-delete-part-btn");

        // показваме модала
        toggle("delete-part-modal");

        // 👉 махаме стари event-и (важно!)
        yesBtn.onclick = null;
        noBtn.onclick = null;

        // 👉 ДА = изтриваме
        yesBtn.onclick = async () => {
            closeModal("delete-part-modal"); // затвори
            await deletePartFromComponent(part, componentId);
            await refreshPage();// връщаме данните
        };

        // 👉 НЕ = отказ
        noBtn.onclick = () => {
            toggle("delete-part-modal"); // затвори
            resolve(null);
            closeModal("delete-part-modal");
        };
    });
}

export function openDeleteComponent(component) {

    return new Promise((resolve) => {

        const modal = document.getElementById("delete-component-modal");
        const yesBtn = document.getElementById("delete-component-btn");
        const noBtn = document.getElementById("not-delete-component-btn");

        // показваме модала
        toggle("delete-component-modal");

        // 👉 махаме стари event-и (важно!)
        yesBtn.onclick = null;
        noBtn.onclick = null;

        // 👉 ДА = изтриваме
        yesBtn.onclick = async () => {
            closeModal("delete-component-modal"); // затвори
            await deleteComponent(component);
            await refreshPage();// връщаме данните
        };

        // 👉 НЕ = отказ
        noBtn.onclick = () => {
            toggle("delete-component-modal"); // затвори
            resolve(null);
            closeModal("delete-component-modal");
        };
    });

}

export function openDeleteSubDevice(subDeviceId) {

    return new Promise((resolve) => {

        const yesBtn = document.getElementById("delete-sub-device-btn");
        const noBtn = document.getElementById("not-delete-sub-device-btn");

        toggle("delete-sub-device-modal");

        yesBtn.onclick = null;
        noBtn.onclick = null;

        yesBtn.onclick = async () => {

            closeModal("delete-sub-device-modal");

            await deleteSubDevice(subDeviceId);

            await refreshPage();
        };

        noBtn.onclick = () => {

            closeModal("delete-sub-device-modal");

            resolve(null);
        };
    });
}

export function openDeleteDevice(deviceId) {

    return new Promise((resolve) => {

        const yesBtn = document.getElementById("delete-device-btn");
        const noBtn = document.getElementById("not-delete-device-btn");

        toggle("delete-device-modal");

        yesBtn.onclick = null;
        noBtn.onclick = null;

        yesBtn.onclick = async () => {

            closeModal("delete-device-modal");

            await deleteDevice(deviceId);

            await refreshPage();
        };

        noBtn.onclick = () => {

            closeModal("delete-device-modal");

            resolve(null);
        };
    });
}

export function openEditSubDevice(subDevice) { // ОТВАРЯМ МОДАЛА ЗА РЕДАКТИРАНЕ НА ЧАСТ

    selectedSubDevice = subDevice;
    document.getElementById("sub-device-name-input-change").value = selectedSubDevice.name;


    toggle("sub-device-modal-change");
}

export function openEditDevice(device) { // ОТВАРЯМ МОДАЛА ЗА РЕДАКТИРАНЕ НА ЧАСТ

    selectedDevice = device;
    document.getElementById("device-name-input-change").value = device.name;


    toggle("device-modal-change");
}

export function initChangeSubDevice() {


    document.getElementById("save-sub-device-change-btn").onclick = async () => {
        const name = document.getElementById("sub-device-name-input-change").value.trim();

        let body = {
            id: selectedSubDevice.id,
            name: name,
        };
        await changeSubDevice(body);

        document.getElementById("sub-device-modal-change").style.display = "none";

        await refreshPage();// refresh
    };
}

export function initChangeDevice() {


    document.getElementById("save-device-change-btn").onclick = async () => {
        const name = document.getElementById("device-name-input-change").value.trim();

        let body = {
            id: selectedDevice.id,
            name: name,
        };
        console.log(body)
        await changeDevice(body);

        document.getElementById("device-modal-change").style.display = "none";

        await refreshPage();// refresh
    };
}

export function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

function toggle(id) {
    document.getElementById(id).style.display = "flex";
}

async function refreshPage() {

    if (window.reloadPageStructure) {
        await window.reloadPageStructure();
    }
}

export function openEmployeeModal(users) {

    return new Promise(resolve => {

        const modal = document.getElementById("employeeModal");

        const allEmployees =
            document.getElementById("allEmployees");

        const selectedEmployees =
            document.getElementById("selectedEmployees");

        const note = document.getElementById("taskNote");

        allEmployees.innerHTML = "";
        selectedEmployees.innerHTML = "";

        users.forEach(user => {

            const option = document.createElement("option");

            option.value = user.id;
            option.textContent =
                `${user.firstName} ${user.lastName}`;

            allEmployees.appendChild(option);
        });

        modal.classList.remove("hidden");

        document.getElementById("moveRight").onclick = () => {

            const selected =
                allEmployees.selectedOptions[0];

            if (!selected) return;

            selectedEmployees.appendChild(
                selected.cloneNode(true)
            );
        };

        document.getElementById("moveLeft").onclick = () => {

            const selected =
                selectedEmployees.selectedOptions[0];

            if (selected) {
                selected.remove();
            }
        };

        document.getElementById("confirmEmployees").onclick = () => {

            const ids =
                [...selectedEmployees.options]
                    .map(o => Number(o.value));
            const noteValue = note.value.trim();
            modal.classList.add("hidden");

            resolve({
                ids,
                note: noteValue
            });
        };

        document.getElementById("cancelEmployees").onclick = () => {

            modal.classList.add("hidden");

            resolve(null);
        };
    });
}

window.closeModal = closeModal; // 👉 expose към HTML
window.openAddPartToComponent = openAddPartToComponent;
window.openEditPart = openEditPart;
window.openDeletePart = openDeletePart;
window.openEditComponent = openEditComponent;
window.openDeleteComponent = openDeleteComponent;
window.openAddComponent = openAddComponent;
window.openAddSubDevice = openAddSubDevice;
window.openAddDevice = openAddDevice;
window.openEditSubDevice = openEditSubDevice;
window.openDeleteSubDevice = openDeleteSubDevice;
window.openEmployeeModal = openEmployeeModal;
window.openEditDevice = openEditDevice;
window.openDeleteDevice = openDeleteDevice;