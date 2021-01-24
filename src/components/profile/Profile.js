import { Button, Card, CardContent, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import AvatarImage from '../../images/avatar.png';
import '../../App.css';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import TextFieldComponent from '../reusable/TextFieldComponent';
import UpdateProfileData from '../data/UpdateProfile';
import MultipleSelect from '../reusable/MultipleSelect';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnack, fetchUser, updateProfile } from '../../redux/profile/Actions';
import SnackbarComponent from '../reusable/SnackbarComponent';

function Profile(props) {
    const [state,setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        courses: [],
    });
    const profile = useSelector(state => state.pReducer);
    const user = useSelector(state => state.uReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        setState({
            ...state,
            firstName: user.user.firstName,
            lastName: user.user.lastName,
            email: user.user.email,
            courses: user.user.course,
        });

        if(user.isLoggedIn == false) {
            props.history.push('/');
        }
    },[]);

    const handleChange = ($event) => {
        setState({
            ...state,
            [$event.target.name]: $event.target.value
        });
    }

    const handleClose = () => {
        dispatch(closeSnack());
    }


    const getInputFields = UpdateProfileData.map((data,val) => (
        <div className="row " key={val}>
            <div className="col-4 text-monospace my-auto">
                {data.label}
            </div>
            <div className="col-8 mt-1">
                <TextFieldComponent 
                    required
                    value={state[data.name]}
                    className="w-100"
                    type={data.type}
                    name={data.name}
                    handleChange={handleChange}
                    placeholder={data.placeholder}
                    />
            </div>
        </div>
    ));

    const getInputFieldSmall = UpdateProfileData.map((data,val) => (
        <div className="row " key={val}>
            <div className="col-12 mt-3">
                <TextFieldComponent 
                    required
                    value={state[data.name]}
                    className="w-100"
                    type={data.type}
                    name={data.name}
                    label={data.label}
                    handleChange={handleChange}
                    placeholder={data.placeholder}
                />
            </div>
        </div>
    ));

    const handleCourseChange = ($event) => {
        setState({
            ...state,
            courses: $event.target.value
        });
    }

    const handleSubmit = ($event) => {
        $event.preventDefault();
        dispatch(updateProfile(state,user.user.phone));
    }

    return (
        <div className="container">
            <SnackbarComponent 
                open={profile.open} 
                message={profile.message}
                handleClose={handleClose}
                />
            <div className="row">
                <div className="col-md-4 col-12 mt-3 mt-md-5">
                    <div className="row">
                        <div className="col-md-12 col-sm-10 col-8 offset-2 offset-md-0 offset-sm-1 position-relative">
                            <img src={AvatarImage} className="profile-image"/>
                            <Button 
                                variant="contained" 
                                className="upload-avatar"
                                startIcon={<CameraAltIcon />}
                                >
                                Upload Image
                            </Button>
                        </div>
                    </div>                    
                </div>
                <div className="col-md-8 col-12 text-left mt-5 position-relative">
                    {/* PROFILE CARD */}
                    <Card>
                        <CardContent >
                        <Typography className="px-0 px-md-0  profile-title" gutterBottom variant="h4" component="h2">
                            <b>Hello, {user.user.firstName + ' ' + user.user.lastName}</b>
                        </Typography>
                        <p className="text-left profile-help-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Beatae pariatur neque recusandae! Exercitationem laborum 
                            voluptatibus repellat accusantium laudantium, consequuntur 
                            asperiores quisquam non, expedita ipsum possimus nam, 
                            molestias aliquid ullam neque!
                        </p>
                        </CardContent>
                    </Card>
                    {/* END OF PROFILE CARD */}
                    {/* PROFILE UPDATE CARD */}
                    <Card className="mt-5 mb-5">
                        <CardContent>
                            <h4>
                                <b>ABOUT ME</b>
                            </h4>
                            <div className="d-none d-md-block">
                                <form onSubmit={handleSubmit}>
                                    { getInputFields }

                                    <div className="row ">
                                    
                                        <div className="col-4 text-monospace my-auto">
                                            Courses
                                        </div>
                                        <div className="col-8 mt-0">
                                            <MultipleSelect handleCourseChange={handleCourseChange} courses={state.courses} />
                                        </div>
                                        <br />
                                    </div>
                                    <div className="text-right">
                                    <Button 
                                        startIcon={<EditIcon />}
                                        variant="outlined"
                                        className="profile-update mt-4"
                                        type="submit"
                                        size="large"
                                        >
                                        Update
                                    </Button>
                                    </div>
                                </form>
                            </div>
                        
                            <div className="d-block d-md-none">
                                <form onSubmit={handleSubmit}>
                                    { getInputFieldSmall }

                                    <div className="row ">
                                        <div className="col-12 mt-2">
                                            <MultipleSelect handleCourseChange={handleCourseChange} courses={state.courses} />
                                        </div>
                                        <br />
                                    </div>
                                    <div className="text-right">
                                    <Button 
                                        startIcon={<EditIcon />}
                                        variant="outlined"
                                        className="profile-update mt-4"
                                        type="submit"
                                        size="large"
                                        >
                                        Update
                                    </Button>
                                    </div>
                                </form>
                            </div>
                        
                        </CardContent>
                    </Card>
                    {/* END OF PROFILE UPDATE CARD */}
                </div>
            </div>
        </div>
    )
}

export default Profile
