import { SIGNIN, 
    SIGNOUT,
    USER_LOADED,
    AUTH_ERROR ,
    CREATE_ACCOUNT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null,
    loading: true,
    userLoaded: false
}

function authReducer(state=initialState, action) {
    const { type, payload } = action;
    
    switch(type) {
        case USER_LOADED:
            return  {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false,
                userLoaded: true
            }
        case SIGNIN: 
        case CREATE_ACCOUNT:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }
        case AUTH_ERROR:
        case SIGNOUT:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                token: null,
                user: null,
                userLoaded: false
            }    
        default:
            return state;    
    }
}

export default authReducer;

