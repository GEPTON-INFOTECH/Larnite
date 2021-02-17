import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../firebase/firebase';
import { loginUserAuth } from '../../redux/auth/Actions';
import { fetchStudyMaterials,returnContent } from '../../redux/courses/Actions';
import SnackbarComponent from '../reusable/SnackbarComponent';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Button } from '@material-ui/core';
import '../../App.css';
import { useHistory } from 'react-router';
import $ from 'jquery';
import ReactMarkdown from 'react-markdown'

function ChapterContent(props) {
    const [state,setState] = useState({
        open: false,
        message: '',
        cur_id: null,
        queue: [],
        URL: [],
        nextLoading: false
    });
    const [content,setContent] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();
    const course = useSelector(state => state.cReducer);
    const user = useSelector(state => state.uReducer);
    useEffect(async () => {
        const db = firebase.firestore();
        let id = props?.location?.state?.id;
        dispatch(fetchStudyMaterials());
        
        if(id == null){
           id = returnContent(props.match.params);
        }
        if(id == null) {
            id = course.notFoundID;
        } 

        getCurrentState(id);

        const topic = (await db.collection('Topics').doc(id).get()).data();
        setContent(`${topic?.content}`);

       
    }, [props.location?.state?.id]);



    const textToHTML = () => {
        return {__html: content};
    }

    const handleClose = () => {
        setState({
            ...state,
            open: false
        })
    }

    const getCurrentState = (id) => {
        let courseName = props.match.params.courseName.replace(/-/g,' ');
        let paperName = props.match.params.paperName.replace(/-/g,' ');

        let contentQueue = JSON.parse(localStorage.getItem('ContentQueue'));
    
        let flag = 0;
        for(let i = 0 ; i < contentQueue.length ; i++ ) {
            if(contentQueue[i].courseName == courseName) {
                for(let j = 0 ; j < contentQueue[i].papers.length ; j++ ) {
                    if(contentQueue[i].papers[j].paperName == paperName){
                        setState({
                            ...state,
                            cur_id: id,
                            queue: contentQueue[i].papers[j].queue,
                            URL: contentQueue[i].papers[j].URL
                        });
                        flag = 1;
                        break;
                    }
                }
                if(flag == 1)
                    break;
            }
        }
        console.log(state);
    }

    const previousPage = () => {
        let courseName = props.match.params.courseName.replace(/-/g,' ');

        if(state.cur_id != null){
            let idx = state.queue.indexOf(`${state.cur_id}`); 
            if(idx > 0){
                history.push({
                    pathname:`/${courseName}/${state.URL[idx-1]}`,
                    state: {
                        id: state.queue[idx-1]
                    }
                });
            } 
        }
    }

    const nextPage = async () => {
        setState({
            ...state,
            nextLoading: true
        })

        let courseName = props.match.params.courseName.replace(/-/g,' ');
        const db = firebase.firestore();
        // CHECK IF THE USER HAS ALREADY COMPLETED THE TOPIC
         // SET A TIMEOUT WHICH CAN KEEP TRACK OF COMPLETION OF THE TOPIC BY USER
         if(!user.user.completedTopics?.includes(state.cur_id)) {
             let ct = user.user.completedTopics || [];
             ct.push(state.cur_id);
             await db.collection('students').doc(user.user.phone).update({
                 completedTopics: ct
             });
 
             let us = (await db.collection('students').doc(user.user.phone).get()).data();
 
             dispatch(loginUserAuth(us,false));
             setState({
                 ...state,
                 open: true,
                 message: 'Topic Completed'
             });
         }

        let idx = state.queue.indexOf(`${state.cur_id}`);
    
        console.log(idx);
            if(idx < state.queue.length - 1){
                history.push({
                    pathname:`/${courseName}/${state.URL[idx+1]}`,
                    state: {
                        id: state.queue[idx+1]
                    }
                });
            }
        setState({
            ...state,
            nextLoading: false
        })
    }

    return (
        <>
        {course?.notFoundID != state?.cur_id && <div className="px-3 mt-5 mt-lg-0">
            <Button className="theme-background px-2 mt-2 mt-lg-0"
                disabled={state.queue.indexOf(`${state.cur_id}`) == 0}
                onClick={() => previousPage()}
            >
                <KeyboardArrowLeftIcon /> Prev&nbsp;&nbsp;
            </Button>
            <Button
                onClick={() => nextPage()}
                disabled={state.nextLoading}
                className="float-right theme-background px-2 mt-2 mt-lg-0">
                &nbsp;&nbsp;{state.queue.indexOf(`${state.cur_id}`) == state.queue.length - 1 ? 'Finish' : 'Next' }
                <KeyboardArrowRightIcon />
            </Button>
        </div>
        }
       <SnackbarComponent open={state.open} message={state.message} handleClose={handleClose}/>
  
        <div id="content" className="container-fluid content-element mt-2 mb-3 text-left"  >
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        </>
    )
}

export default ChapterContent;
