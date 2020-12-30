import { combineReducers } from 'redux';
import errors from './errors';
import auth from './auth';
import profile from './profile';

export default combineReducers({
    errors, auth, profile
});

