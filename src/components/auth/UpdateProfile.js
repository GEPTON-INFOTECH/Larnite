import React,{ useState,useEffect } from 'react'
import { Courses } from '../data/Courses';
import CheckboxComponent from '../reusable/CheckboxComponent';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import firebase from '../../firebase/firebase';
import { useHistory } from "react-router-dom";


function UpdateProfile({phone}) {
    const [state,setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        courses: []
    });
    let history = useHistory();

    useEffect(() => {
        setState({
            ...state,
            courses: Courses
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
        console.log('UPDATE FORM SUBMITTED');
        console.log(state);

        const db = firebase.firestore();
        // INSERT DATA INTO FIRESTORE
        const studentRef = db.collection('students')
                            .doc(phone)
                            .set({
                                firstName: state.firstName,
                                lastName: state.lastName,
                                email: state.email,
                                phone: phone
                            });

        history.push('/');
    }

    const getCourseCheckboxes = state.courses.map((data,val) => (
            <CheckboxComponent 
                key={val}
                checked={data.checked} 
                name={data.title}
                handleChange={handleChange}
                />
    ));

    return (
        <div className="col-lg-8 col-md-10
            col-sm-12 col-12 
            offset-lg-2 offset-md-1
            mt-0 mt-md-2">
            <Card className="text-center p-0 p-md-5 shadow">
                    <CardContent className="w-100">
                        <Typography variant="h4" component="h2" className="mt-2">
                            Update Details
                        </Typography>
                    
                        <form onSubmit={handleSubmit} className="mt-5">
                            {/* NAME */}
                                <TextField 
                                        required
                                        name="firstName"
                                        type="text"
                                        label="First Name"
                                        variant="outlined" 
                                        color="primary"
                                        placeholder="First Name"
                                        className="width-text-field pr-1 text-center mb-4"
                                        onInput={handleChange}
                                        value={state.phone}
                                        >
                                </TextField>
                                <TextField 
                                    required
                                    name="lastName"
                                    type="text"
                                    label="Last Name"
                                    variant="outlined" 
                                    color="primary"
                                    placeholder="Last Name"
                                    className="width-text-field pl-1 text-center mb-4"
                                    onInput={handleChange}
                                    value={state.phone}
                                    >
                                </TextField>
                                    
                            {/* EMAIL  */}
                            <TextField 
                                    required
                                    name="email"
                                    type="email"
                                    label="Email"
                                    variant="outlined" 
                                    color="primary"
                                    placeholder="Email"
                                    className="w-100 text-center p-0 mb-3"
                                    onInput={handleChange}
                                    value={state.email}
                                    >
                            </TextField>
                                <br />
                            {/* END OF EMAIL */}
                            {/* CHECBOXES */}
                            { getCourseCheckboxes }
                            {/* END OF CHECKBOXES */}
                            <br/>
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
