import React, { useEffect } from 'react'
import CourseChapterCards from '../reusable/CourseChapterCards'
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../redux/courses/Actions';
import { Button } from '@material-ui/core';

function Courses() {
    const dispatch = useDispatch();
    const courses = useSelector(state => state.cReducer);
    const user = useSelector(state => state.uReducer);

    useEffect(()=>{
        dispatch(fetchCourses(user.user.course));
    },[]);

    const getCoursesHTML = courses.courses.map((d,val) => {
        return d != null ? (
                        <CourseChapterCards key={val} course={d} />
                     ) : (<></>)
    });

    return (
        <div className="mx-0">
            <div className="container-fluid jumbotron bg-dark">
                <div className="container">
                        <h2 className="heading-underline pt-5 text-white">TRAINING</h2>
                        <p className="text-left course-content text-white">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, vel, sed laborum, at recusandae magni maxime debitis voluptate corporis est fugiat. Corrupti asperiores natus ratione, quos assumenda quasi illo inventore!
                        </p>
                        <Button variant="contained" className="mt-3">View Courses</Button>
                </div> 
            </div>

            <div className="container-fluid mx-0 px-0">
                { 
                    getCoursesHTML
                }
            </div>

        </div>
    )
}

export default Courses
