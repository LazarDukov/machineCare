import {loadStructure} from "../pages/fullStructure.js";
import {createDevice} from "../api/devicesApi.js";
import {createSubDevice} from "../api/subDevicesApi.js";
import {createComponent, changeComponent, deleteComponent} from "../api/componentsApi.js";
import {addPartToComponent, changePart, changePartQuantityIntoComponent, createPart} from "../api/partsApi.js";
import {deletePartFromComponent} from "../api/componentsPartsApi.js";

let selectedDevice = null;
let selectedSubDevice = null;
let selectedComponent = null;

export function openAddDeviceModal() { // ОТВАРЯМ МОДАЛА ЗА ДОБАВЯНЕ НА УСТРОЙСТВО
    toggle("device-modal");
    document.getElementById("device-modal").style.display = "flex";
}

export function initDeviceModal() { // ТУК ДОБАВЯМ УСТРОЙСТВО
    const machineName = new URLSearchParams(window.location.search).get("name");
    document.getElementById("save-device-btn").onclick = async () => {
        const name = document.getElementById("device-name-input").value.trim();

        if (!name) return;
        let body = {name, machineName};
        await createDevice(body);

        document.getElementById("device-modal").style.display = "none";

        await loadStructure(); // refresh
    };
}

export function openAddSubDeviceModal(deviceId) { // ОТВАРЯМ МОДАЛА ЗА ДОБАВЯНЕ НА ПОДУСТРОЙСТВО
    selectedDevice = deviceId;
    console.log("deviceIdЛИ?:", deviceId);
    console.log("deviceIdЛИ?:", selectedDevice);
    toggle("subDevice-modal");
}

export function initSubDeviceModal() { // ТУК ДОБАВЯМ ПОДУСТРОЙСТВО

    document.getElementById("save-subDevice-btn").onclick = async () => {
        const name = document.getElementById("subDevice-name-input").value.trim();

        if (!name) return;
        let body = {name, deviceId: selectedDevice};
        await createSubDevice(body);

        document.getElementById("subDevice-modal").style.display = "none";

        await loadStructure(); // refresh
    };
}

export function openAddComponentModal(subDeviceId) { //ОТВАРЯМ МОДАЛА ЗА ДОБАВЯНЕ НА КОМПОНЕНТ
    selectedSubDevice = subDeviceId;
    console.log("subDeviceId:", subDeviceId);
    toggle("component-modal");
}

export function initComponentModal() { // ТУК ДОБАВЯМ КОМПОНЕНТ

    document.getElementById("save-component-btn").onclick = async () => {
        const name = document.getElementById("component-name-input").value.trim();
        const additionalInfo = document.getElementById("component-additional-info-input").value.trim();

        if (!name) return;
        let body = {name, additionalInfo: additionalInfo, subDeviceId: selectedSubDevice};
        await createComponent(body);

        document.getElementById("component-modal").style.display = "none";

        await loadStructure(); // refresh
    };
}

export function openEditComponentModal(component) { // ОТВАРЯМ МОДАЛА ЗА РЕДАКТИРАНЕ НА ЧАСТ
    console.log("edit component:", component);
    selectedComponent = component;
    console.log(component)
    console.log(selectedComponent.name);
    console.log(selectedComponent.additionalInfo);
    console.log(component.additionalInfo);
    document.getElementById("component-name-input-change").value = selectedComponent.name;
    document.getElementById("component-additional-info-input-change").value = selectedComponent.additionalInfo;

    toggle("component-modal-change");
}

export function initChangeComponent() {
    console.log("IM in edit")// ОТВАРЯМ МОДАЛА ЗА РЕДАКТИРАНЕ НА КОМПОНЕНТ

    document.getElementById("save-component-change-btn").onclick = async () => {
        const name = document.getElementById("component-name-input-change").value.trim();
        const additionalInfo = document.getElementById("component-additional-info-input-change").value.trim();

        let body = {
            id: selectedComponent.id,
            name: name,
            additionalInfo: selectedComponent.additionalInfo
        };
        await changeComponent(body);
        console.log(body)
        document.getElementById("component-modal-change").style.display = "none";

        await loadStructure(); // refresh
    };
}

export function openAddPartToComponent(componentId) { // ОТВАРЯМ МОДАЛА ЗА ДОБАВЯНЕ НА ЧАСТ КЪМ КОМПОНЕНТ
    selectedComponent = componentId;
    console.log("componentId:", componentId);
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
            componentId: selectedComponent,
            partId: createdPart,
            quantity: quantity
        };
        await addPartToComponent(body2);

        document.getElementById("part-modal").style.display = "none";

        await loadStructure(); // refresh
    };
}

let selectedPart = null;

export function openEditPart(part, componentId) { // ОТВАРЯМ МОДАЛА ЗА РЕДАКТИРАНЕ НА ЧАСТ
    console.log("edit part:", part);
    selectedPart = part;
    selectedComponent = componentId;
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
            componentId: selectedComponent,
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

        await loadStructure(); // refresh
    };
}

export function openDeletePartFromComponent(part, componentId) {
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
            await loadStructure();// връщаме данните
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
            await loadStructure();// връщаме данните
        };

        // 👉 НЕ = отказ
        noBtn.onclick = () => {
            toggle("delete-component-modal"); // затвори
            resolve(null);
            closeModal("delete-component-modal");
        };
    });

}

export function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

function toggle(id) {
    document.getElementById(id).style.display = "flex";
}

window.closeModal = closeModal; // 👉 expose към HTML
