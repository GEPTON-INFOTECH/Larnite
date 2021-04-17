import React,{ useEffect,useState } from 'react'
import { MenuItem } from 'react-pro-sidebar';
import firebase from '../../firebase/firebase';
import { useHistory } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useSelector } from 'react-redux';

function TopicList({paper,course,chapter}) {
    const [state,setState] = useState({
        topics: [],
        loading: false
    });
    const history = useHistory();
    const user = useSelector(state => state.uReducer);

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
        if(isSubscribed === true)
            setState({
                ...state,
                topics: t
            });
        return () => {isSubscribed = false}
    },[]);

    const changeTopic = (d) => {
        history.push({
            pathname: `/${course}/${paper.paperName.replace(/\s/g,'-')}/${chapter.chapterName.replace(/\s/g,'-')}/${d.topicName.replace(/\s/g,'-')}`,
            state: {
                id: d.id
            }
        });
    }

    const topicList = state.topics.map((d,vl) => (
        <MenuItem key={vl} 
            onClick={() => changeTopic(d)}>
                <span style={{fontSize:'13px'}}>{d.topicName}</span>  
                { user.user.completedTopics?.includes(d.id) && <CheckCircleOutlineIcon style={{float: 'right'}} /> }
        </MenuItem>
    ));



    return (
        <>
        {state.topics !== [] && topicList}
        </>
    )
}

export default TopicList
