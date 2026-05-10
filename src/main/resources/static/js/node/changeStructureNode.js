function findNode(nodes, type, id) {

    for (const node of nodes) {

        if (
            node.type === type &&
            node.id === id
        ) {
            return node;
        }

        const found =
            findNode(
                node.children || [],
                type,
                id
            );

        if (found) {
            return found;
        }
    }

    return null;
}