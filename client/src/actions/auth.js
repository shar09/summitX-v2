import { ServiceCatalogAppRegistry } from 'aws-sdk';
import api from '../utils/api';
import { setError } from './error';
import { RESET_ERRORS } from './types'; 

export const signIn = (email, password) => async dispatch => {
    const body = { email, password }

    try {
        const res = await api.post('/auth', body);
    } catch (err) {
        // console.log(err.response);
        const errors = err.response.data.errors;

        if(errors) {
            dispatch({
                type: RESET_ERRORS
            });
            errors.forEach(error => dispatch(setError(error.msg, error.param)));
        }

    }
} 