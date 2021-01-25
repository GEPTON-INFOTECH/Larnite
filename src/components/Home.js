import React,{ useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import firebase from '../firebase/firebase';
import '../App.css';
import Course from '../images/Courses.svg';
import { Button } from '@material-ui/core';

function Home() {
    return (
        <div>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-6 col-12 my-auto text-left">
                        <h2 className="heading">Introduction</h2>
                        <p className="text-left course-content">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, vel, sed laborum, at recusandae magni maxime debitis voluptate corporis est fugiat. Corrupti asperiores natus ratione, quos assumenda quasi illo inventore!
                        </p>
                        <Button className="mt-2 text-left rounded-pill mb-3 mb-md-0 theme-background" size="large" variant="contained" color="primary">Expore Courses</Button>
                    </div>
                    <div className="col-md-6 col-12">
                        <img src={Course} className="img-fluid"/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
