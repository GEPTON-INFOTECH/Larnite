import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../firebase/firebase';
import { fetchStudyMaterials,returnContent } from '../../redux/courses/Actions';


function ChapterContent(props) {
    const [content,setContent] = useState('');
    const dispatch = useDispatch();
    const course = useSelector(state => state.cReducer);
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
        console.log(id);    
        const topic = (await db.collection('Topics').doc(id).get()).data();
        setContent(topic?.content);
    }, [props.location?.state?.id]);


    const textToHTML = () => {
        return {__html: content};
    }


    return (
        <div dangerouslySetInnerHTML={textToHTML()}>

        </div>
    )
}

export default ChapterContent;
