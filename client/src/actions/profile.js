import api from '../utils/api';
import {
    CREATE_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPLOAD_RESUME
} from './types';
import { loadUser } from './auth';

// Create Profile
export const createProfile = formData => async dispatch => {
    try {
        const res = await api.post('/profile', formData);

        dispatch({
            type: CREATE_PROFILE,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        // const errors = err.response.data.errors;
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Update Profile
export const updateProfile = formData => async dispatch => {
    try {
        const res = await api.post('/profile', formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        
    } catch (err) {
        // const errors = err.response.data.errors;
        
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

// Upload Resume
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
        // const errors = err.response.data.errors;

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
    }
}

// Add Experience
export const addExperience = newExp => async dispatch => {
    try {
        const res = await api.post('/profile/experience', newExp);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        
    } catch (err) {
        // const errors = err.response.data.errors;
    
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Edit Experience
export const editExperience = (id, editExp) => async dispatch => {
    
    try {
        const res = await api.put(`/profile/experience/${id}`, editExp);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

    } catch (err) {
        // const errors = err.response.data.errors;
    
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete Experience
export const deleteExperience = id => async dispatch => {

    try {
        const res = await api.delete(`/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }         
        });
    }
}