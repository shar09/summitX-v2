import {
    UPDATE_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPLOAD_RESUME
} from '../actions/types';

const initialState = {
    profile: null,
    error: {},
    loading: true
}

function profileReducer(state=initialState, action) {
    const { payload, type } = action;

    switch(type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:    
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                loading: false,
                error: payload
            };
        case UPLOAD_RESUME: 
            return {
                ...state,
                profile: payload,
                loading: false
            }     
        default:
            return state;        
    }
}

export default profileReducer;

