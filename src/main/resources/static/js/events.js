import { structureIndex } from "./structure/structureIndex.js";
import { openEditDevice } from "./ui/modals.js";
import { openEditSubDevice } from "./ui/modals.js";
import { openEditComponent } from "./ui/modals.js";

const handlers = {
    "edit-device": (id) => openEditDevice(structureIndex.get(`device-${id}`)),
    "edit-subDevice": (id) => openEditSubDevice(structureIndex.get(`subDevice-${id}`)),
    "edit-component": (id) => openEditComponent(structureIndex.get(`component-${id}`)),
};

export function initEventDelegation(container) {

    container.addEventListener("click", (e) => {

        const el = e.target.closest("[data-action]");
        if (!el) return;

        const action = el.dataset.action;
        const id = Number(el.dataset.id);

        handlers[action]?.(id);
    });
}