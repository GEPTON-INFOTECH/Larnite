import React,{ useEffect,useState } from 'react'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { Menu,MenuItem, SubMenu } from 'react-pro-sidebar';
import ChapterList from './ChapterList';
import firebase from '../../firebase/firebase';


function TopicList({paper,course}) {
    const [state,setState] = useState({
        topics: [],
        loading: false
    });

    useEffect(async ()=>{
        const db = firebase.firestore();
        const paperTopics = paper.topics;
        let t = [];
        for(let i = 0 ; paperTopics && i < paperTopics?.length ; i++ ) {
            const topic = (await db.collection('Topics')
                                    .doc(paperTopics[i])
                                    .get())
                                    .data();
            t.push({
                ...topic,
                id: paperTopics[i]
            });
        }
        setState({
            ...state,
            topics: t
        });
        console.log(t);

    },[]);

    const topicList = state?.topics?.map((d,val) => (
        <SubMenu
            key={val}
            title={d.topicName} 
            icon={<LocalLibraryIcon />}>
            <ChapterList 
                course={course} 
                paper={paper}
                topic={d}
            />
        </SubMenu>
    ));

    return (
        <>
        {topicList}
        </>
    )
}

export default TopicList
