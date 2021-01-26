import { combineReducers } from 'redux';
import authReducer from './auth/Reducers';
import ProfileReducer from './profile/Reducer';
import AvatarReducer from './avatar/Reducers';

const rootReducer = combineReducers({
    uReducer: authReducer,
    pReducer: ProfileReducer,
    aReducer: AvatarReducer
});

export default rootReducer;