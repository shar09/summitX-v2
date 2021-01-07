import {
    CREATE_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPLOAD_RESUME,
    CLEAR_PROFILE
} from '../actions/types';

const initialState = {
    profile: null,
    error: {},
    profileLoading: true
}

function profileReducer(state=initialState, action) {
    const { payload, type } = action;

    switch(type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                profileLoading: false
            };
        case CREATE_PROFILE:    
            return {
                ...state,
                profile: payload,
                profileLoading: false
            };    
        case UPDATE_PROFILE:    
            return {
                ...state,
                profile: payload,
                profileLoading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                profileLoading: false,
                error: payload
            };
        case UPLOAD_RESUME: 
            return {
                ...state,
                profile: {
                    ...state.profile,
                    resume: payload
                },
                profileLoading: false
            } 
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                profileLoading: true,
                error: null
            }        
        default:
            return state;        
    }
}

export default profileReducer;

