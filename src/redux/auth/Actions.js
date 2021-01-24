import { LOGIN_USER_REQUEST,
         LOGIN_USER_AUTH, 
         LOGIN_USER_ERROR,
         CLOSE_SNACK,
         LOGOUT_USER_LOADING,
         LOGOUT_USER_MESSAGE } from './ActionTypes';
import firebase from '../../firebase/firebase';


export const loginUserRequest = () => {
    return {
        type: LOGIN_USER_REQUEST
    }
}

export const loginUserAuth = (user,updateDetails) => {
    return {
        type: LOGIN_USER_AUTH,
        payload: {
            user,
            updateDetails
        }
    }
}

export const loginUserError = (err) => {
    return {
        type: LOGIN_USER_ERROR,
        payload: err
    }
}

export const closeSnackbar = () => {
    return {
        type: CLOSE_SNACK
    }
}


export const loginUser = (phone,history,appVerifier) => {
    return dispatch => {
        try {
            dispatch(loginUserRequest());

            firebase.auth().signInWithPhoneNumber(`+${phone}`, appVerifier)
                .then(function (confirmCode) {
                    let OTP = window.prompt('Enter the OTP you received','');
                    if(OTP != null){
                        confirmCode.confirm(OTP)
                        .then(async res => {
                            if(!res.additionalUserInfo.isNewUser){
                                let db = firebase.firestore();
                                let data = await db.collection('students').doc(`+${phone}`).get();
                                if(data.data() == undefined) {
                                    dispatch(loginUserAuth({},true))
                                } else {
                                    dispatch(loginUserAuth(data.data(),false));
                                    
                                    localStorage.setItem('User',JSON.stringify(data.data()));
                                    localStorage.setItem('Exp',Date.now() + 60*60*24*1000);
                                    
                                    history.push('/');
                                }
                            } else {
                                dispatch(loginUserAuth({},true))
                            }
                        })
                        .catch(err => {
                            dispatch(loginUserError(err.message))
                        })
                    }
                })
                .catch(function (error) {
                    dispatch(loginUserError(error.message))
                }); 
        } catch(e) {
            console.log(e);
        }
        
    }
}


export const logoutRequest = () => {
    return {
        type: LOGOUT_USER_LOADING
    }
}
export const logoutMessage = (msg) => {
    return {
        type: LOGOUT_USER_MESSAGE,
        payload: msg
    }
}

export const logout = (history) => {
    return dispatch => {
        try {
            dispatch(logoutRequest());
            localStorage.removeItem('User');
            localStorage.removeItem('Exp');
            dispatch(logoutMessage('Logged Out Successfull'));
            history.push('/');
        } catch(e) {
            dispatch(logoutMessage('Logged Out Failed'));
        }

    }
}