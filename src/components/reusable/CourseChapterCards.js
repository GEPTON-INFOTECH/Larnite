import React,{ useState,useEffect } from 'react'
import { Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@material-ui/core';
import '../../App.css';
import Carousel, { consts } from "react-elastic-carousel";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FunctionsIcon from '@material-ui/icons/Functions';
import PaperCard from './PaperCard';
import { useSelector,useDispatch } from 'react-redux';
import firebase from '../../firebase/firebase';
import {loginUserAuth} from '../../redux/auth/Actions';
import SnackbarComponent from './SnackbarComponent';
import Spinner from './Spinner';

function CourseChapterCards({ course }) {
    const user = useSelector(state => state.uReducer);
    const dispatch = useDispatch();

    const [state,setState] = useState({
        courseID: course.id,
        papers: [],
        loading: false,
        open: false,
        message: ''
    });

    useEffect(async () => {
        const db = firebase.firestore();
        //  FETCH THE TOPICS
        let papers = [];
        for(let i = 0 ; course.papers && i < course.papers?.length ; i++ ) {
            let p = course.papers[i];
            const t = (await db.collection('Papers').doc(p).get());
            papers.push({
                ...t.data(),
                id: p
            });
        }
        setState({
            ...state,
            papers: papers
        });
    }, [])

    const myArrow = ({ type, onClick, isEdge }) => {
        return type === consts.PREV ? 
                <KeyboardArrowLeftIcon className="my-auto" style={{cursor:'pointer'}} onClick={onClick} disabled={isEdge} /> 
                : 
                <KeyboardArrowRightIcon className="my-auto" style={{cursor:'pointer'}} onClick={onClick} disabled={isEdge} />
    }
    const breakPoints = [
        { width: 1, itemsToShow: 1,pagination: false },
        { width: 550, itemsToShow: 2,pagination: false },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 },
      ];
      

    // E
    const paperCard = state?.papers?.map((d,val) => {
        return d != null ? (
                            <PaperCard key={val} paper={d} course={course} readMore={(!user.user?.enrolled || 
                                (   user.user.enrolled &&
                                     !user.user?.enrolled.includes(course.id)))} />
                           ) : (<div></div>)
    });

    const enrollCourse = async () => {
        setState({
            ...state,
            loading: true
        })
        const db = firebase.firestore();
        let enrolled = user.user.enrolled || [];
        enrolled.push(course.id);
        await db.collection('students').doc(user.user.phone).update({
            enrolled: enrolled
        });

        const student = (await db.collection('students').doc(user.user.phone).get()).data();
        
        localStorage.setItem('User',JSON.stringify(student));
        dispatch(loginUserAuth(student,false));

        setState({
            ...state,
            open: true,
            message: 'Successfully Enrolled for ' + course.courseName,
            loading: false,
        });

    }
        
    const handleClose = () => {
        setState({
            ...state,
            open: false,
            message: ''
        })
    }
    return (
        <div className="mt-5 mx-0 mx-sm-2">
            <SnackbarComponent open={state.open} handleClose={handleClose} message={state.message}/>
            <>
            <h2 style={{ textAlign: "left" }} className="name-color pl-0 pl-md-3">
                <span className="heading-underline">{ course.courseName }</span> &nbsp;
                {
                        (!user.user?.enrolled || 
                            (   user.user.enrolled &&
                                 !user.user?.enrolled.includes(course.id))) ?
                        <Button 
                            disabled={state.loading} 
                            onClick={enrollCourse} 
                            variant="contained" 
                            className="theme-background"
                            color="primary">
                                Enroll Now
                        </Button> : ''
                }
                { state.loading && <CircularProgress size={24} style={{
                    top: '50%',
                    left: '50%'
                    }} />}
            </h2>
            <p className="text-left pl-0 pl-md-3 mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto at obcaecati perferendis soluta quisquam consectetur amet repellendus vitae doloremque blanditiis, cumque nostrum aliquam eveniet porro, necessitatibus ullam. Dolores, est vitae.
            </p>
            <div className="mt-3">
                    { (course.papers == null || course.papers.length == 0) ? 
                            <Card className="text-left">
                                <CardContent>
                                    <h3>We are working on the resources</h3>
                                </CardContent>
                            </Card>
                        :
                        <Carousel className="mx-0 px-0" renderArrow={myArrow} breakPoints={breakPoints}>
                                 {state.papers != [] ? paperCard : <div></div>}
                        </Carousel>
                    }

            </div>
            </>
        </div>
    )
}

export default CourseChapterCards
