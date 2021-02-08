import {
    UPDATE_AVATAR_REQUEST,
    UPDATE_AVATAR_SUCCESS,
    UPDATE_AVATAR_ERROR,
    FETCH_AVATAR_REQUEST,
    FETCH_AVATAR_SUCCESS,
    FETCH_AVATAR_ERROR
} from './ActionTypes';
import firebase from '../../firebase/firebase';
import {loginUserAuth} from '../auth/Actions';
import { updateProfileMessage } from '../profile/Actions';


export const updateAvatarRequest = () => {
    return {
        type: UPDATE_AVATAR_REQUEST
    }    
}
export const updateAvatarSuccess = () => {
    return {
        type: UPDATE_AVATAR_SUCCESS,
        payload: 'Avatar Updated'
    }
}

export const updateAvatarError = () => {
    return {
        type: UPDATE_AVATAR_ERROR,
        payload: 'Avatar update failed'
    }
}

export const updateAvatar = 
    (phone,avatar = '',cover = '') => {
        return async dispatch => {
            dispatch(updateAvatarRequest());
            try {
                const db = firebase.firestore();
                const updatedStudent = db.collection('students')
                                          .doc(phone)
                                          .update({
                                              cover:cover,
                                              avatar: avatar 
                                          });
                let student = await db.collection('students').doc(phone).get();

                dispatch(updateProfileMessage('Profile Update Successful'));
                
                localStorage.setItem('User',JSON.stringify(student.data()));
            
                dispatch(loginUserAuth(student.data(),false));
            } catch(e) {
                dispatch(updateAvatarError());
            }
        }
    }

export const fetchAvatarRequest = () => {
    return {
        type: FETCH_AVATAR_REQUEST
    }
}
export const fetchAvatarSuccess = (avatars) => {
    return {
        type: FETCH_AVATAR_SUCCESS,
        payload: avatars
    }
}
export const fetchAvatarError = () => {
    return {
        type: FETCH_AVATAR_ERROR,
        payload: 'Avatars Not Found'
    }
}

export const fetchAvatar = () => {
    return async dispatch => {
        dispatch(fetchAvatarRequest());
        try {
            let result = [];
            let av = [];
            
            const db = firebase.firestore();
            const avatars = await db.collection('avatars').get();
            av = avatars.docs.map(a => a.data());

            for(let i = 0 ; i < av.length ; i++ ) {
                result.push({
                    avatar: {URL: av[i].URL},
                    cover: {URL: av[i].cover}
                });
            }

            dispatch(fetchAvatarSuccess(result));

        } catch(e) {
            console.log(e);
            dispatch(fetchAvatarError());
        }
    }
}

