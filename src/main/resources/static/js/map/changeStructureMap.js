export function mapStructure(devices) {

    return devices.map(device => ({

        id: device.id,

        name: device.name,

        type: "device",

        original: device,

        children:
            mapSubDevices(device.subDevices || [])
    }));
}
export function mapSubDevices(subDevices) {

    return subDevices.map(sd => ({

        id: sd.id,

        name: sd.name,

        type: "subdevice",

        original: sd,

        children:
            mapComponents(sd.components || [])
    }));
}
export function mapComponents(components) {

    return components.map(component => ({

        id: component.id,

        name: component.name,

        type: "component",

        original: component,

        children:
            mapParts(component.parts || [])
    }));
}

export function mapParts(parts) {

    return parts.map(part => ({

        id: part.id,

        name: part.name,

        type: "part",

        original: part,

        children: []
    }));
}

