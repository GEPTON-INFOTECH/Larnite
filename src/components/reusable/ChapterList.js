import React, { useEffect,useState } from 'react'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { Menu,MenuItem, SubMenu } from 'react-pro-sidebar';
import firebase from '../../firebase/firebase';
import { Link, useHistory } from 'react-router-dom';

function ChapterList({course,paper,topic}) {
    const [state,setState] = useState({
        chapters: [],
        loading: false
    });
    const history = useHistory();

    useEffect(async() => {
        const db = firebase.firestore();
        const paperChapters = topic.chapters;
        let isSubscribed = true;
        let c = [];
        for(let i = 0 ;paperChapters && i < paperChapters?.length ; i++ ) {
            const chapter = (await db.collection('Chapters')
                                     .doc(paperChapters[i])
                                     .get())
                                     .data();
            c.push({
                ...chapter,
                id: paperChapters[i]
            });                 
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
    const changeChapter = (url) => {
        history.push(url);
    }

    const chapterlist = state.chapters.map((d,vl) => (
        <MenuItem key={vl} 
            onClick={() => changeChapter(`/papers/${getURL(paper.paperName)}/${getURL(topic.topicName)}/${getURL(d.chapterName)}`)}>
                {d.chapterName}
        </MenuItem>
    ));

    return (
        <React.Fragment>
            {state.chapters != [] && chapterlist}
        </React.Fragment>
    )
}

export default ChapterList
