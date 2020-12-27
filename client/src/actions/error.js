import { SET_ERROR, RESET_ERRORS } from './types';

export const setError = (msg, param) => async dispatch => {
    dispatch({
        type: SET_ERROR,
        payload: { msg, param }
    });
}

export const resetErrors = () => ({
    type: RESET_ERRORS
});