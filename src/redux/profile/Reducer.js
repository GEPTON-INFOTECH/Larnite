import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_MESSAGE,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    CLOSE_SNACK
} from './ActionTypes';

const initialState = {
    loading: false,
    message: '',
    open: false,
    user: {}
}

const ProfileReducer = (state=initialState,action) => {
    switch(action.type) {
        case UPDATE_PROFILE_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_PROFILE_MESSAGE: return {
            ...state,
            loading: false,
            message: action.payload,
            open: true
        }
        case FETCH_USER_REQUEST: return {
            ...state,
            loading: true,
        }
        case FETCH_USER_SUCCESS: return {
            ...state,
            user: action.payload,
            loading: false,
        }
        case FETCH_USER_ERROR: return {
            ...state,
            message: action.payload,
            loading: false
        }
        case CLOSE_SNACK: return {
            ...state,
            loading: false,
            message: '',
            open: false
        }
        default: return state;
    }
}

export default ProfileReducer;