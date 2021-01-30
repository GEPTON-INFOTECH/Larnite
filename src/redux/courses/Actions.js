import {
    FETCH_COURSES_REQUEST,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_ERROR
} from './ActionTypes';
import firebase from '../../firebase/firebase';

export const fetchCoursesRequest = () => {
    return {
        type: FETCH_COURSES_REQUEST
    }
}
export const fetchCoursesSuccess = (courses) => {
    return {
        type: FETCH_COURSES_SUCCESS,
        payload: courses
    }
}

export const fetchCoursesError = (err) => {
    return {
        type: FETCH_COURSES_ERROR,
        payload: err
    }
}

export const fetchCourses = (phone) => {
    return async dispatch => {
        try {
            dispatch(fetchCoursesRequest());

            let courses = [];
            const db = firebase.firestore();
            const c = (await db.collection('courses').get()).docs;

            for(let i = 0 ; i < c.length ; i++ ) {
                const a = await c[i].data();
                courses[i] = {...a,id: c[i].id};
            }
            dispatch(fetchCoursesSuccess(courses));

        } catch(e) {
            console.log(e);
            dispatch(fetchCoursesError('Error Occured in fetching courses'))
        }
    }
}
