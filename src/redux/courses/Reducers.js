import {
    FETCH_COURSES_REQUEST,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_ERROR
} from './ActionTypes';

const initialState = {
    loading: false,
    error: '',
    courses: [],
    notFoundID: 'vhi36zSRakZWWYESTrWj'
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
        default: return state;
    }
}
export default CoursesReducer;