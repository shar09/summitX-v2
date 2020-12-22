import { SET_ERROR } from '../actions/types';
import { RESET_ERRORS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case RESET_ERRORS:
            return [];

        case SET_ERROR:
            // for(let i=0; i<state.length; i++) {
            //     if(state[i].param === payload.param) {
            //         return state;
            //     }
            //     else
            //         continue;
            // }
            return [...state, payload];
        default: 
            return state;    
    }
}

