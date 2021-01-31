import React, { useEffect,useState } from 'react'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { Menu,MenuItem, SubMenu } from 'react-pro-sidebar';
import firebase from '../../firebase/firebase';

function ChapterList({course,paper,topic}) {
    const [state,setState] = useState({
        chapters: [],
        loading: false
    });

    useEffect(async() => {
        const db = firebase.firestore();
        const paperChapters = topic.chapters;

        let c = [];
        for(let i = 0 ;paperChapters && i < paperChapters.length ; i++ ) {
            const chapter = (await db.collection('Chapters')
                                     .doc(paperChapters[i])
                                     .get())
                                     .data();
            c.push({
                ...chapter,
                id: paperChapters[i]
            });                 
        }

        setState({
            ...state,
            chapters: c
        })

    });

    const chapterlist = state.chapters.map((d,vl) => (
        <MenuItem>{d.chapterName}</MenuItem>
    ));

    return (
        <>
            {chapterlist}
        </>
    )
}

export default ChapterList
