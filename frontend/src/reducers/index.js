import { combineReducers } from 'redux';

import todos from './todos';
import authReducer from './auth';

export default combineReducers({
    todos,authReducer
});