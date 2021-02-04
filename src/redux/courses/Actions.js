import {
    FETCH_COURSES_REQUEST,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_ERROR,
    SET_CURRENT_COURSE,
    SET_CURRENT_PAPER
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

export const fetchStudyMaterials = () => {
    return async dispatch => {
        let user = localStorage.getItem('User');
        const db = firebase.firestore();
        if(user) {
            const c = (await db.collection('courses').get()).docs;
            let courses = [];
            for(let i = 0 ; i < c.length ; i++ ) {
                const a = c[i].data();
                courses[i] = {...a,papers: [],id: c[i].id};

                let papers = [];
                for(let idx = 0 ; idx < a.papers?.length ; idx++ ) {
                        let p = (await db.collection('Papers').doc(a.papers[idx]).get());
                        let p1 = p.data();
                        papers[idx] = {...p1,chapters:[],id: p.id};

                        let chapters = [];

                        for(let idx2 = 0 ; idx2 < p1?.chapters?.length ; idx2++){
                            let c = (await db.collection('Chapters').doc(p1?.chapters[idx2]).get());
                            let c1 = c.data();
                            chapters[idx2] = {...c1,topics:[],id: c.id};

                            const topics = [];
                            for(let idx3 = 0 ; idx3 < c1?.topics?.length ; idx3++){
                                    let t = (await db.collection('Topics').doc(c1?.topics[idx3]).get());
                                    let t1 = t.data();
                                    topics[idx3] = {...t1,id: t.id};
                            };
                            chapters[idx2].topics = topics;
                        };
                        papers[idx].chapters = chapters;
                }
                courses[i].papers = papers;
                console.log(i,courses[i],papers);
                localStorage.setItem('Material',JSON.stringify(courses));
            } 

        }
    }
};

export const returnContent = (params) => {
    let courseName = params.courseName;
    let paperName = params.paperName;
    let chapterName = params.chapterName;
    let topicName = params.topicName;

    let id = null;
    const courses = localStorage.getItem('Material');
    if(courses && courseName) {
        for(let i = 0 ; i < courses.length ; i++ ) {
            if(courses[i].courseName === courseName){
                let papers = courses[i].papers;
                if(paperName && papers) {
                    for(let j = 0 ; j < papers.length ; j++ ) {
                        if(papers[j].paperName === paperName){
                            id = papers[j].home;
                            let chapters = papers[j].chapters;
                            if(chapters && chapterName) {
                                for(let k = 0 ; k < chapters.length ; k++ ) {
                                    if(chapters[k].chapterName === chapterName){
                                        id = chapters[k].home;
                                        let topics = chapters[k].topics;
                                        if(topics && topicName) {
                                            for(let l = 0 ; l < topics.length ; l++ ) {
                                                if(topics[j].topicName === topicName){
                                                    id = topics[j].id;
                                                    break;
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }
                                break;
                            }
                            break;
                        }
                    }
                }

            }
        }
    }
    return id;
}


export const getPercentage = async (completedArray,id) => {
    let total = 0;
    let completed = 0;
    const db = firebase.firestore();
    let paper = await db.collection('Papers').doc(id).get();
    paper = paper.data();
    
    if(paper?.home) total++ ;

    if(paper?.home && completedArray.includes(paper?.home)) {
        completed++;
    }
    const chapters = paper?.chapters;

    if(chapters){

        for(let i = 0 ; i < chapters?.length ; i++ ) {
            let chapter = await db.collection('Chapters').doc(chapters[i]).get();
            chapter = chapter?.data();
            if(chapter?.home) total++;
    
            if(chapter?.home &&  completedArray.includes(chapter.home)){
                completed++;
            }
    
            const topics = chapter?.topics;
    
            if(topics) {
                for(let j = 0 ; j < topics.length ; j++ ) {            
                    total++;
                    if(completedArray.includes(topics[j])){
                        completed++;
                    }
                }
            }
        }
    }

    if(total == 0) 
        return 0;
    return parseFloat(completed * 100 / total).toFixed(2);
}