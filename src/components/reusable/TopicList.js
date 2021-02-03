import React,{ useEffect,useState } from 'react'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { Menu,MenuItem, SubMenu } from 'react-pro-sidebar';
import ChapterList from './ChapterList';
import firebase from '../../firebase/firebase';
import { Link,useHistory } from 'react-router-dom';

function TopicList({paper,course,chapter}) {
    const [state,setState] = useState({
        topics: [],
        loading: false
    });
    const history = useHistory();

    useEffect(async ()=>{
        const db = firebase.firestore();
        const paperTopics = chapter.topics;
        let t = [];
        let isSubscribed = true;
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
        if(isSubscribed == true)
            setState({
                ...state,
                topics: t
            });
        return () => {isSubscribed = false}
    },[]);

    const changeTopic = (d) => {
        history.push({
            pathname: `/papers/${paper.paperName.replace(/\s/g,'-')}/${chapter.chapterName.replace(/\s/g,'-')}/${d.topicName.replace(/\s/g,'-')}`,
            state: {
                id: d.id
            }
        });
    }

    const topicList = state.topics.map((d,vl) => (
        <MenuItem key={vl} 
            onClick={() => changeTopic(d)}>
                {d.topicName}
        </MenuItem>
    ));



    return (
        <>
        {state.topics != [] && topicList}
        </>
    )
}

export default TopicList
