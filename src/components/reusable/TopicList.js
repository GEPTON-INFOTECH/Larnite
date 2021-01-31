import React,{ useEffect,useState } from 'react'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { Menu,MenuItem, SubMenu } from 'react-pro-sidebar';
import ChapterList from './ChapterList';
import firebase from '../../firebase/firebase';
import { Link,useHistory } from 'react-router-dom';

function TopicList({paper,course}) {
    const [state,setState] = useState({
        topics: [],
        loading: false
    });
    const history = useHistory();

    useEffect(async ()=>{
        const db = firebase.firestore();
        const paperTopics = paper.topics;
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

    const changeTopic = (url) => {
        history.push(url);
    }

    const topicList = state?.topics?.map((d,val) => (
        <SubMenu
            key={val}
            title={d.topicName} 
            icon={<LocalLibraryIcon />}>
            <MenuItem onClick={() => changeTopic(`/papers/${paper.paperName.replace(/\s/g,'-')}/${d.topicName.replace(/\s/g,'-')}`)} >Home</MenuItem>

            <ChapterList 
                course={course} 
                paper={paper}
                topic={d}
            />
        </SubMenu>
    ));

    return (
        <>
        {state.topics != [] && topicList}
        </>
    )
}

export default TopicList
