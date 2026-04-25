export function getOperatorsTechnicians() {
    return fetch(`/api/users/operators-technicians`, {
        credentials: "include"
    }).then(r => r.json());
}