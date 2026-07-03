export function getOperatorsTechnicians() {
    return fetch(`/api/users/operators-technicians`, {
        credentials: "include"
    }).then(r => r.json());
}

export function getTechnicians() {
    return fetch(`/api/users/technicians`, {
        credentials: "include"
    }).then(r => r.json());
}