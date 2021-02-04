import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../firebase/firebase';
import { loginUserAuth } from '../../redux/auth/Actions';
import { fetchStudyMaterials,returnContent } from '../../redux/courses/Actions';
import SnackbarComponent from '../reusable/SnackbarComponent';

function ChapterContent(props) {
    const [content,setContent] = useState('');
    const [state,setState] = useState({
        open: false,
        message: ''
    })
    const dispatch = useDispatch();
    const course = useSelector(state => state.cReducer);
    const user = useSelector(state => state.uReducer);
    useEffect(async () => {
        const db = firebase.firestore();
        let id = props.location.state?.id;
        console.log(id); 
        dispatch(fetchStudyMaterials());
        
        if(id == null){
           id = returnContent(props.match.params);
        }
        if(id == null) {
            id = course.notFoundID;
        } 
        const topic = (await db.collection('Topics').doc(id).get()).data();
        setContent(topic?.content);

        // CHECK IF THE USER HAS ALREADY COMPLETED THE TOPIC
        // SET A TIMEOUT WHICH CAN KEEP TRACK OF COMPLETION OF THE TOPIC BY USER
        if(!user.user.completedTopics?.includes(id)) {
            let ct = user.user.completedTopics || [];
            setTimeout(async () => {
                ct.push(id);
                await db.collection('students').doc(user.user.phone).update({
                    completedTopics: ct 
                });

                let us = (await db.collection('students').doc(user.user.phone).get()).data();

                dispatch(loginUserAuth(us,false));
                setState({
                    open: true,
                    message: 'Topic Completed'
                });
            },30000);
        }
        
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

    return (
        <>
        <SnackbarComponent open={state.open} message={state.message} handleClose={handleClose}/>
        <div className="container-fluid overflow-hidden" dangerouslySetInnerHTML={textToHTML()}>
        </div>
        </>
    )
}

export default ChapterContent;
