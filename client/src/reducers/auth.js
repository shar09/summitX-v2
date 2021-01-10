import { SIGNIN, 
    SIGNOUT,
    USER_LOADED,
    AUTH_ERROR ,
    CREATE_ACCOUNT,
    UPDATE_MSG
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null,
    loading: true,
    msg: '',
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
        case UPDATE_MSG:
            return {
                ...state,
                msg: payload
            }     
        default:
            return state;    
    }
}

export default authReducer;

