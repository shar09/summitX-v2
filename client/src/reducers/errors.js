import { SET_ERROR,
    RESET_ERRORS 
} from '../actions/types';

const initialState = [];

// for(let i=0; i<state.length; i++) {
//     if(state[i].param === payload.param) {
//         return state;
//     }
//     else
//         continue;
// }

function errorsReducer(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case RESET_ERRORS:
            return [];

        case SET_ERROR:
            return [...state, payload];
        default: 
            return state;    
    }
}

export default errorsReducer;

