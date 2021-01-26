import { LOGIN_USER_REQUEST,
        LOGIN_USER_AUTH, 
        LOGIN_USER_ERROR,
        CLOSE_SNACK,
        LOGOUT_USER_LOADING,
        LOGOUT_USER_MESSAGE } from './ActionTypes';
        
let exp = localStorage.getItem('Exp');
if(exp && exp < Date.now()){
    localStorage.removeItem('User');
    localStorage.removeItem('Exp');
}
let user = JSON.parse(localStorage.getItem('User'));

const initialState = {
    user: user,
    isLoggedIn: user != null,
    loading: false,
    error: '',
    updateDetails: false,
    open: false,
    logoutSnackOpen: false
}



const authReducer = (state=initialState,action) => {
    switch(action.type) {
        case LOGIN_USER_REQUEST: return {
            ...state,
            loading: true,
            user: null,
            isLoggedIn: false,
            error: '',
            open: false,
            updateDetails: false,
            logoutSnackOpen: false
        }
        case LOGIN_USER_AUTH: return {
            ...state,
            loading: false,
            user: action.payload.user,
            isLoggedIn: true,
            error: '',
            open: false,
            updateDetails: action.payload.updateDetails,
            logoutSnackOpen: false
        }
        case LOGIN_USER_ERROR: return {
            ...state,
            loading: false,
            user: {},
            isLoggedIn: false,
            error: action.payload,
            open: true,
            updateDetails: false,
            logoutSnackOpen: false
        }
        case CLOSE_SNACK: return {
            ...state,
            open: false,
            error: '',
            logoutSnackOpen: false
        }
        case LOGOUT_USER_LOADING: return {
            ...state,
            loading: true,
            logoutSnackOpen: false
        }
        case LOGOUT_USER_MESSAGE: return {
            ...state,
            loading: false,
            user: null,
            isLoggedIn: false,
            error: action.payload,
            open: false,
            updateDetails: false,
            logoutSnackOpen: true
        }
        default: return state;
    }
}

export default authReducer;