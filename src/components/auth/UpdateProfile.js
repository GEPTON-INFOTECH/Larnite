import React,{ useState,useEffect } from 'react'
import { Courses } from '../data/Courses';
import CheckboxComponent from '../reusable/CheckboxComponent';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';

function UpdateProfile() {
    const [state,setState] = useState({
        name: '',
        email: '',
        courses: []
    });

    useEffect(() => {
        setState({
            ...state,
            courses: Courses
        })
        console.log(state);
    }, []);

    const handleChange = ($event) => {
        let field = $event.target.name;
        if(field == 'name' || field == 'email') {
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
        <div>
            <Card className="text-center p-0 p-md-5">
                    <CardContent className="w-100">
                        <Typography variant="h4" component="h2" className="mt-2">
                            Update Details
                        </Typography>
                    
                        <form onSubmit={handleSubmit} className="mt-4">
                            {/* NAME */}
                            <TextField 
                                    name="name"
                                    type="text"
                                    label="Name"
                                    variant="outlined" 
                                    color="primary"
                                    placeholder="Name"
                                    className="w-100 text-center p-0 mb-3"
                                    onInput={handleChange}
                                    value={state.phone}
                                    >
                            </TextField>
                                <br />
                            {/* END OF NAME */}

                            {/* EMAIL  */}
                            <TextField 
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
