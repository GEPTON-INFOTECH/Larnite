import { combineReducers } from 'redux';
import authReducer from './auth/Reducers';
import ProfileReducer from './profile/Reducer';

const rootReducer = combineReducers({
    uReducer: authReducer,
    pReducer: ProfileReducer
});

export default rootReducer;