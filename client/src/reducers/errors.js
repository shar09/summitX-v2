import { SET_ERROR,
    RESET_ERRORS 
} from '../actions/types';

const initialState = [];

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

