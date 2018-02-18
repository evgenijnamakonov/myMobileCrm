import * as types from '../actions/actionTypes';
import { initialState } from '../initialState';

export default function reducers( state = initialState, action ) {

    let newState = Object.assign( {}, state );
    switch ( action.type ) {
        case types.SET_TOKEN:
    }
}

