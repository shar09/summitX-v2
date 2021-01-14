import api from '../utils/api';
import {
    CREATE_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPLOAD_RESUME,
    UPDATE_SKILL,

} from './types';
import { loadUser } from './auth';
import { setError, resetErrors } from './error';

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
    // dispatch(resetErrors()); 

    try {
        const res = await api.post('/profile/resume', resume);

        dispatch({
            type: UPLOAD_RESUME,
            payload: res.data
        });

        dispatch(loadUser());
    }
    catch (err) {
        const errors = err.response.data.errors;
    
        if(errors) {
            errors.forEach(error => dispatch(setError(error.msg, error.param)));
        }
    }
}

// Update Resume
export const updateResume = resume => async dispatch => {
    // dispatch(resetErrors()); 

    try {
        const res = await api.post('/profile/resume', resume);

        dispatch({
            type: UPLOAD_RESUME,
            payload: res.data
        });
    }
    catch (err) {
        const errors = err.response.data.errors;
    
        if(errors) {
            errors.forEach(error => dispatch(setError(error.msg, error.param)));
        }
    }
}

// Get Resume
// export const getResume = () => async dispatch => {
//     try {
        
//         const res = await api.get('profile/resume');


//     } catch (err) {
//         dispatch({
//             type: PROFILE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         });
//     }
// }

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

// Add Education
export const addEducation = newEdu => async dispatch => {
    try {
        const res = await api.post('/profile/education/', newEdu);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }         
        });
    }
}

// Edit Education
export const editEducation = (id, editEdu) => async dispatch => {
    try {
        const res = await api.put(`/profile/education/${id}`, editEdu);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }         
        });
    }
}

// Delete Education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await api.delete(`/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }         
        });
    }
}

// Add Skill
export const addSkill = text => async dispatch => {
    try {
        const res = await api.post('/profile/skills', text);

        dispatch({
            type: UPDATE_SKILL,
            payload: res.data
        });
    }
    catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }         
        });
    }
}

// Delete Skill
export const deleteSkill = id => async dispatch => {
    try {
        const res = await api.delete(`/profile/skills/${id}`);

        dispatch({
            type: UPDATE_SKILL,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }         
        });
    }
}