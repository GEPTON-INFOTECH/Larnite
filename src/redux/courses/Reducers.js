import {
    FETCH_COURSES_REQUEST,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_ERROR,
    SET_CURRENT_COURSE,
    SET_CURRENT_PAPER
} from './ActionTypes';

const initialState = {
    loading: false,
    error: '',
    courses: [],
    currentCourse: JSON.parse(localStorage.getItem('Current Course')),
    currentPaper: JSON.parse(localStorage.getItem('Current Paper')) 
}

const CoursesReducer = (state = initialState,action ) => {
    switch(action.type) {
        case FETCH_COURSES_REQUEST: return {
            ...state,
            loading: true
        }
        case FETCH_COURSES_SUCCESS: return {
            ...state,
            loading: false,
            courses: action.payload
        }
        case FETCH_COURSES_ERROR: return {
            ...state,
            loading: false,
            error: action.payload
        }
        case SET_CURRENT_COURSE: return {
            ...state,
            loading: false,
            currentCourse: action.payload
        }
        case SET_CURRENT_PAPER: return {
            ...state,
            loading: false,
            currentPaper: action.payload
        }
        default: return state;
    }
}
export default CoursesReducer;