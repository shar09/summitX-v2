import { SET_ERROR } from './types';

export const setError = (msg, param) => async dispatch => {
    dispatch({
        type: SET_ERROR,
        payload: { msg, param }
    });
}