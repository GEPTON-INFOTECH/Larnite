import React, { useEffect, useState } from 'react'
import '../../App.css';
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@material-ui/core';
import firebase from '../../firebase/firebase';
import LinearProgress from '@material-ui/core/LinearProgress';
import Spinner from '../reusable/Spinner';
import { getStats } from '../../redux/profile/Actions';
import Skeleton from '@material-ui/lab/Skeleton';

function Stats({user}) {
    const [XP,setXP] = useState(0);
    const [totalXP,setTotalXP] = useState(0);
    const [loading,setLoading] = useState(true);

    useEffect(async () => {
        getStats(user,setXP,setTotalXP,setLoading);
    },[]);

    const fetchOne = async (doc_id,collection) => {
        const Collection = firebase.firestore().collection(collection);
        let fetchedData = (await Collection.doc(doc_id).get());
        return {
            ...fetchedData.data(),
            id: fetchedData.id
            };
    }
    

    const getStats = async (user) => {
        let enrolled = user.enrolled;
        let courses = [];
        if(enrolled){
            let material = JSON.parse(localStorage.getItem('Material'));
            for(let i = 0 ; i < material.length ; i++){
                let idx = enrolled.indexOf(material[i].courseName);
                console.log(idx);
                if(idx == -1)
                    continue;
    
                let current_course = {
                    courseName: '',
                    completedXP: 0,
                    totalXP: 0
                };
    
    
                // let course = await fetchOne(enrolled[idx],'courses');
                console.log('Hello',material[i]);
                current_course.courseName = material[i].courseName;
                let papers = material[i].papers;
                if(papers){
                    for(let j = 0 ; j < papers.length ; j++ ) {
                        // let paper = await fetchOne(papers[j],'Papers');
                        let paper = papers[j];

                        if(paper.home){
                            let topic = await fetchOne(paper.home,'Topics');
                            current_course.totalXP += parseInt(topic.experiencePoints || 0)
                            if(user.completedTopics.indexOf(paper.home) != -1) {
                                current_course.completedXP += parseInt(topic.experiencePoints || 0)
                            }
                        }
                        let chapters = paper.chapters;
                        if(chapters){
                            for(let k = 0 ; k < chapters.length ; k++ ) {
                                let chapter = await fetchOne(chapters[k].id,'Chapters');

                                if(chapter.home){
                                    let topic = await fetchOne(chapter.home,'Topics');
                                    current_course.totalXP += parseInt(topic.experiencePoints || 0)
                                    if(user.completedTopics.indexOf(chapter.home) != -1) {
                                        current_course.completedXP += parseInt(topic.experiencePoints || 0)
                                    }
                                }
    
                                let topics = chapter.topics;
                                for(let l = 0 ; l < topics.length ; l++ ) {
                                    let topic = await fetchOne(topics[l],'Topics');
                                    current_course.totalXP += parseInt(topic.experiencePoints || 0)
                                    if(user.completedTopics.indexOf(topic.id) != -1) {
                                        current_course.completedXP += parseInt(topic.experiencePoints || 0)
                                    } 
                                }
                            }
                        }
                    }
                }
    
                courses.push(current_course);
            }
        }
        
        let XPT = 0;
        let totalXPT = 0;
        for(let i = 0 ; i < courses.length ; i++) {
            XPT += courses[i].completedXP;
            totalXPT += courses[i].totalXP;
        }
    
        console.log(XPT,totalXPT);
        setXP(XPT);
        setTotalXP(totalXPT);
        setLoading(false);
    }



    return (

        <Card className="mt-5 mb-5 ">
            { loading ?             
            <CardContent className="text-left">
                <Skeleton width="200px"/>
                <Skeleton />
                <Skeleton width="200px"/>
            </CardContent>: 
            <CardContent className="text-right">
                    <>
                        <h3 className="text-left">Progress</h3>
                        <LinearProgress 
                            style={{height: '7px'}}
                            className="rounded-pill text-left mt-4"
                            variant="determinate" 
                            value={(totalXP != 0) ? parseInt((XP / totalXP) * 100): 0} /> 
                            <p className="text-right mb-2">{XP} / {totalXP} XP</p>
                    </>
            </CardContent>
             }
        </Card>
    )
}
    

export default Stats;
