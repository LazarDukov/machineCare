import {getFullStructure} from "../api/machinesApi.js";

export async function getStructure(machineName) {

    const data =
        await getFullStructure(machineName);

    return data.structure || [];
}