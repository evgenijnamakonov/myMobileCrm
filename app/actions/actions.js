import * as types from'./actionTypes';

export function setToken(value) {
    return{
        type: types.SET_TOKEN,
        value,
    }
}

export function setEmail(value) {
    return{
        type: types.SET_EMAIL,
        value,
    }
}

export function setData(value) {
    return{
        type: types.SET_DATA,
        value,
    }
}
