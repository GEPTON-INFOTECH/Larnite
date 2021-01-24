import React,{ useState,useEffect } from 'react'
import CheckboxComponent from '../reusable/CheckboxComponent';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import firebase from '../../firebase/firebase';
import { useHistory } from "react-router-dom";
import UpdateProfileData from '../data/UpdateProfile';
import TextFieldComponent from '../reusable/TextFieldComponent';
import SnackbarComponent from '../reusable/SnackbarComponent';
import MultipleSelect from '../reusable/MultipleSelect';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/profile/Actions';

function UpdateProfile({phone}) {
    const [state,setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        courses: [],
        open: false,
        message: ''
    });
    const dispatch = useDispatch();

    let history = useHistory();
    useEffect(() => {
        setState({
            ...state,
            courses: [],
            open: true,
            message: 'Update your details'
        })
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
        dispatch(updateProfile(state,phone));
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
            mt-0 mt-md-2">
                
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
                    
                        <form onSubmit={handleSubmit} className="mt-5">
                                { getInputFields }
                                <br/>
                                <br />
                                <MultipleSelect handleCourseChange={handleCourseChange} courses={state.courses} />
                                <br />

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
