import {
    UPDATE_AVATAR_REQUEST,
    UPDATE_AVATAR_SUCCESS,
    UPDATE_AVATAR_ERROR,
    FETCH_AVATAR_REQUEST,
    FETCH_AVATAR_SUCCESS,
    FETCH_AVATAR_ERROR
} from './ActionTypes';

const initialState = {
    loading: false,
    message: '',
    error: '',
    avatars: []
}

const AvatarReducer = (state = initialState,action) => {
    switch(action.type) {
        case UPDATE_AVATAR_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_AVATAR_SUCCESS: return {
            ...state,
            message: action.payload
        }
        case UPDATE_AVATAR_ERROR: return {
            ...state,
            error: action.payload
        }
        case FETCH_AVATAR_REQUEST: return {
            ...state,
            loading: true
        }
        case FETCH_AVATAR_SUCCESS: return {
            ...state,
            avatars: action.payload
        }
        case FETCH_AVATAR_ERROR: return {
            ...state,
            error: action.payload
        }
        default: return state;     
    }
}

export default AvatarReducer;