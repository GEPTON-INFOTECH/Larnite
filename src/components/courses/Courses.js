import React, { useEffect } from 'react'
import CourseChapterCards from '../reusable/CourseChapterCards'
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../redux/courses/Actions';

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
        <div className="mt-5">
            <div className="container mt-5">
                        <h2 className="heading-underline pt-5">TRAINING</h2>
                        <p className="text-left course-content">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, vel, sed laborum, at recusandae magni maxime debitis voluptate corporis est fugiat. Corrupti asperiores natus ratione, quos assumenda quasi illo inventore!
                        </p>
            </div>

            <div className="container-fluid mt-5 pt-5">
                { courses && courses.courses != null ? getCoursesHTML : '' }
            </div>

        </div>
    )
}

export default Courses
