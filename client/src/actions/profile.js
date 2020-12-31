import api from '../utils/api';
import {
    UPDATE_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPLOAD_RESUME
} from './types';
import { loadUser } from './auth';

// Create or Update Profile
export const createProfile = formData => async dispatch => {
    try {
        const res = await api.post('/profile', formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get current users profile
export const getProfile = () => async dispatch => {
    try {
        const res = await api.get('/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {      
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const uploadResume = resume => async dispatch => {
    try {
        const res = await api.post('/profile/resume', resume);

        dispatch({
            type: UPLOAD_RESUME,
            payload: res.data
        });

        dispatch(loadUser());
    }
    catch (err) {
        console.log(err.response.data.errors);
    }
}