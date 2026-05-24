export let structureIndex = new Map();

export function buildIndex(structure) {
    structureIndex.clear();
    walk(structure);
}

function walk(nodes) {
    for (const node of nodes) {

        structureIndex.set(`${node.type}-${node.id}`, node);

        if (node.children?.length) {
            walk(node.children);
        }
    }
}