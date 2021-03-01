import React,{ useState,useEffect } from 'react'
import CheckboxComponent from '../reusable/CheckboxComponent';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import firebase from '../../firebase/firebase';
import { useHistory } from "react-router-dom";
import UpdateProfileData from '../data/UpdateProfile';
import TextFieldComponent from '../reusable/TextFieldComponent';
import SnackbarComponent from '../reusable/SnackbarComponent';
import MultipleSelect from '../reusable/MultipleSelect';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/profile/Actions';
import axios from 'axios';
import { CountryData } from '../data/CountryData';

function UpdateProfile({phone}) {
    const [state,setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        courses: [],
        open: false,
        message: '',
        examDate: []
    });
    const dispatch = useDispatch();
    const [countries,setCountries] = useState(CountryData);
    const examDates = [];

    let history = useHistory();
    useEffect(async () => {
        setState({
            ...state,
            courses: [],
            open: true,
            message: 'Update your details'
        });

        // GET ALL COUNTRIES
       
    }, []);

    const handleChange = ($event) => {
        let field = $event.target.name;
        if(field == 'firstName' || field == 'email' || field == 'lastName' ) {
            setState({
                ...state,
                [$event.target.name]: $event.target.value
            });
        } else {
            checkToggleCourse($event.target.name,$event.target.checked);
        }
    }

    const checkToggleCourse = (name,checked) => {
        for(let i = 0 ; i < state.courses.length ; i++ ) {
            if(state.courses[i].title == name) {
                state.courses[i].checked = checked;
            }
        }
    }

    const handleSubmit = ($event) => {
        $event.preventDefault();
        let examDates = [];
        for(let i = 0 ; i <state.courses.length ; i++ ) {
            for(let j = 0 ; j < state.examDate.length ; j++ ) {
                if(state.examDate[j].exam == state.courses[i]) {
                    examDates[i] = {
                        date: state.examDate[j].date,
                        exam: state.courses[i]
                    }
                }
            }
        }
        setState({
            ...state,
            examDate: examDates
        })

        dispatch(updateProfile({...state,examDate: examDates},phone));
        history.push('/');
    }


    const getInputFields = UpdateProfileData.map((data,val) => (
        <TextFieldComponent
            key={val}
            name={data.name}
            type={data.type}
            label={data.label}
            placeholder={data.placeholder}
            className={data.className}
            handleChange={handleChange}
        />
    ));

    const handleCourseChange = ($event) => {
        setState({
            ...state,
            courses: $event.target.value
        });
    }

    const handleCountryChange = (event) => {
        console.log(event);
        setState({
            ...state,
            country: event.target.value
        })
    }

    const setDate = (event) => {
        let ed = state.examDate;
        let x = -1;
        for(let i = 0 ; i < ed.length ; i++) {
            if(event.target.id == ed[i].exam) {
                x = 0;
                ed[i].date = event.target.value;
            }
        }
        if(x == -1)
            ed.push({
                exam: event.target.id,
                date: event.target.value
            });
            
        setState({
            ...state,
            examDate: ed
        })
    }

    // GET DATE PICKERS
    const getDatePickers = state.courses.map((c, idx) => {
        let date = -1;
        for(let i = 0 ; i < state.examDate.length ; i++) {

            if(state.examDate[i].exam == c) {
                date = state.examDate[i].date;
            }
        }
         return (
            <TextField
                key={idx}
                className="w-50 px-4"
                required
                id={c}
                value={date}
                type="date"
                label={c + " Exam Date"}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={setDate}
            />
        )
    });

    const handleClose = () => {
        setState({
            ...state,
            open: false,
            message:''
        });
    }

    return (
        <div className="col-lg-8 col-md-10
            col-sm-12 col-12 
            offset-lg-2 offset-md-1
            ">
                
            {/* SNACKBAR */}
            <SnackbarComponent 
                open={state.open} 
                handleClose={handleClose}
                message={state.message}
                />
            {/* END OF SNACKBAR */}


            <Card className="text-center p-0 p-md-5 shadow">
                    <CardContent className="w-100">
                        <Typography variant="h4" component="h2" className="mt-2">
                            Update Details
                        </Typography>
                    
                        <form onSubmit={handleSubmit} className="mt-5 text-left">
                                { getInputFields }

                                <FormControl className="w-100">
                                {/* COUNTRY FIELD */}
                                <InputLabel id="country-select">Age</InputLabel>
                                <Select labelId="country-select" required  value={state.country} onChange={handleCountryChange}>
                                    {
                                        countries.map((c,idx) => (
                                            <MenuItem value={c} key={idx}>{c}</MenuItem>
                                        ))
                                    }

                                </Select>
                                </FormControl>
                                {/* END OF COUNTRY FIELD */}
                                <br/>
                                <br />
                                <MultipleSelect handleCourseChange={handleCourseChange} courses={state.courses} />
                                <br />

                                { getDatePickers }

                                <Button 
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    className="mt-2 w-100 py-2"
                                    >
                                        Update
                                </Button>
                            </form>
                    </CardContent>
                    </Card>
        </div>
    )
}

export default UpdateProfile;
