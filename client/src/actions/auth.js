import api from '../utils/api';
import { setError, resetErrors } from './error';
import { SIGNIN, 
    SIGNOUT,
    USER_LOADED,
    AUTH_ERROR,
    CREATE_ACCOUNT,
    CLEAR_PROFILE
} from './types'; 

// Load User
export const loadUser = () => async dispatch => {
    try {
        const res = await api.get('/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

// Signin
export const signIn = (email, password) => async dispatch => {
    const body = { email, password };
    
    dispatch(resetErrors());    
    
    try {
        const res = await api.post('/auth', body);

        dispatch({
            type: SIGNIN,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
    
        if(errors) {
            errors.forEach(error => dispatch(setError(error.msg, error.param)));
        }
    }
} 

// Create Account
export const createAccount = (formData) => async dispatch => {
    dispatch(resetErrors());

    try {
        const res = await api.post('/users', formData); 

        dispatch({
            type: CREATE_ACCOUNT,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setError(error.msg, error.param)));
        }
    }
}

// Edit Name (Experimental)
export const editName = (firstname, lastname) => async dispatch => {
    
    try {
        const res = await api.put('/users', { firstname, lastname });

        dispatch(loadUser());

    }  catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

// Signout
export const signOut = () => async dispatch => {
    dispatch({
        type: SIGNOUT
    });

    dispatch({
        type: CLEAR_PROFILE
    });
}