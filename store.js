
const state = {};

export function setToken (token) {
    state.token = token;
}

export function getToken () {
    return 'bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k' || state.token || null;
}