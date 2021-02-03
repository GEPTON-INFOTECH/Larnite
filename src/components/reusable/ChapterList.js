import React, { useEffect,useState } from 'react'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { Menu,MenuItem, SubMenu } from 'react-pro-sidebar';
import firebase from '../../firebase/firebase';
import { Link, useHistory } from 'react-router-dom';
import TopicList from './TopicList';

function ChapterList({course,paper}) {
    const [state,setState] = useState({
        chapters: [],
        loading: false
    });
    const history = useHistory();

    useEffect(async() => {
        const db = firebase.firestore();
        const paperTopics = paper.chapters;
        let isSubscribed = true;
        let c = [];
        for(let i = 0 ;paperTopics && i < paperTopics?.length ; i++ ) {
            const chapter = (await db.collection('Chapters')
                                     .doc(paperTopics[i])
                                     .get())
                                     .data();
            c.push({
                ...chapter,
                id: paperTopics[i]
            });   
            console.log(c);              
        }

        if(isSubscribed == true)
            setState({
                ...state,
                chapters: c
            })
        return () => {isSubscribed = false}

    },[]);

    const getURL = (str) => {
        return str.replace(/\s/g,'-');
    }
    const changeChapter = (d) => {
        history.push({
            pathname: `/papers/${getURL(paper.paperName)}/${getURL(d.chapterName)}`,
            state: {
                id: d.home
            }
        });
    }

    
    const chapterlist = state?.chapters?.map((d,val) => (
        <SubMenu
            key={val}
            title={d.chapterName} 
            icon={<LocalLibraryIcon />}>
            <MenuItem onClick={() => changeChapter(d)} >Home</MenuItem>

            <TopicList 
                course={course} 
                paper={paper}
                chapter={d}
            />
        </SubMenu>
    ));

    return (
        <React.Fragment>
            {state.chapters != [] && chapterlist}
        </React.Fragment>
    )
}

export default ChapterList
