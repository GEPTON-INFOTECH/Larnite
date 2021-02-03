import React,{ useEffect, useState } from 'react'
import firebase from '../../firebase/firebase';

function ChapterContent(props) {
    const [content,setContent] = useState('');
    useEffect(async () => {
        const db = firebase.firestore();
        let id = props.location.state?.id;
        console.log(id);    
        // if(id == null) {
        //     let pn = props.match.params.paperName;
        //     if(pn != null) {
        //         const papers =  (await db.collection('Papers').get()).docs;
        //         let res = null;
        //         papers.forEach(p => {
        //             if(p.data().paperName == pn){
        //                 res = {...p.data(),id: p.id};
        //             }
        //         });

        //         let cn = props.match.params.chapterName;

        //         if(cn && res != null) {
        //             const chapters = (await db.collection('Chapters').get()).docs;
        //             chapters.forEach(p => {
        //                 if(p.data().chapterName == cn){
        //                     res = {...p.data(),id: p.id};
        //                 }
        //             });
                    
        //             let tn = props.match.params.topicName;
        //             if(tn && res != null) {
        //                 const topics = (await db.collection('Topics').get()).docs;
        //                 topics.forEach(p => {
        //                     if(p.data().topicName == tn){
        //                         res = {...p.data(),id: p.id};
        //                     }
        //                 });                        
        //             } 
        //         } 

        //         const topic = (await db.collection('Topics').doc(res.id).get()).data();
        //         setContent(topic?.content);
        //         console.log(res);
        //     }
        // } else {
            const topic = (await db.collection('Topics').doc(id).get()).data();
            setContent(topic?.content);
        // }
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
