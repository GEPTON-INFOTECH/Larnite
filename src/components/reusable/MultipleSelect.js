import React,{ useEffect, useState } from 'react'
import firebase from '../../firebase/firebase';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { FormControl } from '@material-ui/core';
import { type } from 'jquery';


function MultipleSelect({ courses,handleCourseChange,disabled = false }) {
    const [state,setState] = useState({
        courses: []
    });

    useEffect(async () => {
        await getCourses();
    },[]);


    const getCourses = async () => {
        const db = firebase.firestore();
        let data = await db.collection('courses').get();
        let da = [];
        for(let i = 0 ; i < data.docs.length ; i++ ) {
            da.push(data.docs[i].data());
        }
        setState({
            courses: da.slice()
        });
    }

    return (
        <div>
            <FormControl className="w-100">
            <InputLabel  id="demo-mutiple-chip-label">Courses</InputLabel>
            <Select
                name="course"
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={courses}
                disabled={disabled}
                onChange={handleCourseChange}
                input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
                <div>
                {selected.map((value) => (
                    <Chip key={value} label={value} />
                ))}
                </div>
            )}
            // MenuProps={MenuProps}
            >
            {state.courses.map((course,val) => (
                <MenuItem key={val} value={course.courseName} >
                    {course.courseName}
                </MenuItem>
            ))}
            </Select>
            </FormControl>
        </div>
    )
}

export default MultipleSelect
