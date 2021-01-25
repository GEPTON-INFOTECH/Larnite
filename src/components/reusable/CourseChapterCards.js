import React from 'react'
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@material-ui/core';
import '../../App.css';
import Carousel, { consts } from "react-elastic-carousel";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FunctionsIcon from '@material-ui/icons/Functions';
import ChapterCard from './ChapterCard';

function CourseChapterCards({ courseName }) {
    let chapters = [
        { id: 1, chapterName: 'Algebra'},
        { id: 2, chapterName: 'Vectors'},
        { id: 3, chapterName: 'Trignometry'}
    ]

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
      
    const chapterCards = chapters.map((ch,vl) => {

    })

    return (
        <div className="mt-5 mx-0 mx-sm-2">
            <>
            <h2 style={{ textAlign: "left" }} className="name-color">
                <FunctionsIcon/> Maths
            </h2>
            <p className="text-left course-content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero omnis ducimus, veniam, perferendis earum, voluptas harum quam molestiae ut consectetur laudantium iste! Cumque vero architecto consectetur temporibus enim repudiandae fugiat!</p>
            <div className="mt-5">
                <Carousel className="mx-0 px-0" renderArrow={myArrow} breakPoints={breakPoints}>
                    <ChapterCard />
                    <ChapterCard />
                    <ChapterCard />
                    <ChapterCard />
                    <ChapterCard />
                </Carousel>
            </div>
            </>
        </div>
    )
}

export default CourseChapterCards
