import { combineReducers } from 'redux';
import authReducer from './auth/Reducers';
import ProfileReducer from './profile/Reducer';
import AvatarReducer from './avatar/Reducers';
import CoursesReducer from './courses/Reducers';

const rootReducer = combineReducers({
    uReducer: authReducer,
    pReducer: ProfileReducer,
    aReducer: AvatarReducer,
    cReducer: CoursesReducer
});

export default rootReducer;