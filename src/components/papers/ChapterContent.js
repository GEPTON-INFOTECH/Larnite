import React,{ useEffect, useState } from 'react'
import firebase from '../../firebase/firebase';

function ChapterContent(props) {
    const [content,setContent] = useState('');
    useEffect(async () => {
        let id = props.location.state.id;
        console.log(id);
        const db = firebase.firestore();
        const chapter = (await db.collection('Chapters').doc(id).get()).data();
        setContent(chapter?.content);
    }, [props.location.state.id]);


    const textToHTML = () => {
        return {__html: content};
    }


    return (
        <div dangerouslySetInnerHTML={textToHTML()}>
        </div>
    )
}

export default ChapterContent;
