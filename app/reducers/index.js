import * as types from '../actions/actionTypes';
import { initialState } from '../initialState';

export function store( state = initialState, action ) {

    let newState = Object.assign( {}, state );
    switch ( action.type ) {
        case types.SET_TOKEN:
            newState.token = action.value;
            return newState;
    }
    return state;
}

