import * as types from '../actions/actionTypes';
import { initialState } from '../initialState';

export function store(state = initialState, action) {

    let newState = Object.assign({}, state);
    switch ( action.type ) {
        case types.SET_TOKEN:
            newState.token = action.value;
            return newState;
        case types.SET_DATA:
            newState.data = action.value;
            return newState;
        case types.SET_EMAIL:
            newState.email = action.value;
            return newState;
    }
    return state;
}

