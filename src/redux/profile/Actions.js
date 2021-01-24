import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_MESSAGE,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    CLOSE_SNACK
} from './ActionTypes';
import firebase from '../../firebase/firebase';
import { loginUserAuth } from '../auth/Actions';

export const updateProfileRequest = () => {
    return {
        type: UPDATE_PROFILE_REQUEST
    }
}

export const  updateProfileMessage = (msg) => {
    return {
        type: UPDATE_PROFILE_MESSAGE,
        payload: msg
    }
}


export const updateProfile =  (state,phone) => {
    return async dispatch => {
        dispatch(updateProfileRequest())
        const db = firebase.firestore();
        // INSERT DATA INTO FIRESTORE
        await db.collection('students')
                .doc(phone)
                .update({
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: state.email,
                    phone: phone,
                    course: state.courses
                });


        let student = await db.collection('students').doc(phone).get();

        dispatch(updateProfileMessage('Profile Update Successful'));
        
        localStorage.setItem('User',JSON.stringify(student.data()));
        localStorage.setItem('Exp',Date.now() + 60*60*24*1000);
    
        dispatch(loginUserAuth(student.data(),false));
    }
}

export const updateBio = (bio,phone) => {
    return async dispatch => {
        dispatch(updateProfileRequest())
        const db = firebase.firestore();
        // INSERT DATA INTO FIRESTORE
        await db.collection('students')
                .doc(phone)
                .update({
                    bio: bio
                });


        let student = await db.collection('students').doc(phone).get();

        dispatch(updateProfileMessage('Bio Updated Successfully'));
        
        localStorage.setItem('User',JSON.stringify(student.data()));
        localStorage.setItem('Exp',Date.now() + 60*60*24*1000);
    
        dispatch(loginUserAuth(student.data(),false));
    }
}

export const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

export const fetchUserSuccess = (user) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: user
    }
}

export const fetchUserError = (err) => {
    return {
        type: FETCH_USER_ERROR,
        payload: err
    }
}

export const fetchUser = (phone) => {
    return async dispatch => {
        try {
            dispatch(fetchUserRequest());
            const db = firebase.firestore();
            const data = await db.collection('students')
                                 .doc(phone)
                                 .get();
            dispatch(fetchUserSuccess(data.data()));
        } catch(e) {
            dispatch(fetchUserError(e));
        }
    }
}


export const closeSnack = () => {
    return {
        type: CLOSE_SNACK
    }
}