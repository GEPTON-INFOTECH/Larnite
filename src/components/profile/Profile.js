import { Button, Card, CardActions, CardContent, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import AvatarImage from '../../images/avatar.png';
import '../../App.css';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import TextFieldComponent from '../reusable/TextFieldComponent';
import UpdateProfileData from '../data/UpdateProfile';
import MultipleSelect from '../reusable/MultipleSelect';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnack, fetchUser, updateProfile, updateBio } from '../../redux/profile/Actions';
import SnackbarComponent from '../reusable/SnackbarComponent';

function Profile(props) {
    const [state,setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        courses: [],
        editBio: false,
        editAbout: false,
        bio: 'Beatae pariatur neque recusandae! Exercitationem laborum voluptatibus repellat accusantium laudantium, consequuntur asperiores quisquam non, expedita ipsum possimus nam',
        editBioValue: 'Beatae pariatur neque recusandae! Exercitationem laborum voluptatibus repellat accusantium laudantium, consequuntur asperiores quisquam non, expedita ipsum possimus nam'
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
            bio: user.user.bio,
            editBioValue: user.user.bio
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
            <div className="col-8 mt-4">
                <TextFieldComponent 
                    required
                    value={state[data.name]}
                    className="w-100"
                    type={data.type}
                    name={data.name}
                    disabled={!state.editAbout}
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
                    disabled={!state.editAbout}
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
        cancelEditAbout();
    }

    const updateBioForm = () => {
        dispatch(updateBio(state.editBioValue,user.user.phone));
        cancelBio();
    }

    const editBio = () => {
        setState({
            ...state,
            editBio: true
        });
    }

    const cancelBio = () => {
        setState({
            ...state,
            editBio: false
        });
    }

    const editAbout = () => {
        setState({
            ...state,
            editAbout: true
        });
    }

    const cancelEditAbout = () => {
        setState({
            ...state,
            editAbout: false
        });
    }

    const getAboutUpdate = () => {
        return (<>
            { state.editAbout == true ? 
                <div className="text-right mt-4">
                        <Button 
                            variant="text" 
                            onClick={cancelEditAbout}
                            color="primary"
                            >
                                Cancel
                        </Button>
                        <Button 
                            variant="text" 
                            onClick={handleSubmit}
                            color="primary"
                            variant="contained"
                            >
                                Update Bio
                        </Button>
                </div> : ''}
                </>
        )
    }


    return (
        <div className="container">
            <SnackbarComponent 
                open={profile.open} 
                message={profile.message}
                handleClose={handleClose}
                />
            <div className="row">
                <div className="col-md-5 col-12 mt-3">
                    <div className="row">
                        <div className="col-md-12 col-sm-10 col-10 offset-1 offset-md-0 offset-sm-1 position-relative">
                            <img src={AvatarImage} className="profile-image"/>
                            <Button 
                                variant="contained" 
                                className="upload-avatar"
                                startIcon={<CameraAltIcon />}
                                >
                                Change Avatar
                            </Button>
                                                
                    {/* PROFILE CARD */}
                            <Card className="text-left mt-4">
                                <CardContent >
                                <Typography className="px-0 px-md-0  profile-title mb-0" gutterBottom variant="h4" component="h2">
                                    <b>Hello, {user.user.firstName + ' ' + user.user.lastName}</b>
                                </Typography>
                                {
                                    state.editBio == true ? 
                                    <div>
                                        <TextField
                                            id="bio"
                                            name="editBioValue"
                                            type="text"
                                            multiline
                                            rows={5}
                                            onInput={handleChange}
                                            value={state.editBioValue}
                                            className="w-100"
                                            variant="outlined"
                                        />
                                                                            
                                        <div className="text-right mt-2">
                                            <Button 
                                                variant="text" 
                                                onClick={cancelBio}
                                                color="primary"
                                                type="button"
                                                >
                                                    Cancel
                                            </Button>
                                            <Button 
                                                type="button"
                                                color="primary"
                                                variant="contained"
                                                onClick={updateBioForm}
                                                >
                                                    Update
                                            </Button>
                                        </div>
                                    </div>
                                    :
                                    <p className="text-left profile-help-text">
                                        {user.user.bio}
                                        <div className="text-right mt-2">
                                            <Button 
                                                color="primary" 
                                                variant="text" 
                                                onClick={editBio}
                                                startIcon={<EditIcon />}>
                                                    Edit Bio
                                            </Button>
                                        </div>
                                    </p>
                                }

                                </CardContent>
              
                            </Card>
                    {/* END OF PROFILE CARD */}
                        </div>
                    </div>                    
                </div>
                <div className="col-md-7 col-12 text-left position-relative">

                    {/* PROFILE UPDATE CARD */}
                    <Card className="mt-5 mb-5">
                        <CardContent>
                            <h4>
                                <b>ABOUT ME </b> 
                                { state.editAbout == false ? 
                                    <Button 
                                        color="primary"
                                        onClick={editAbout}
                                    ><EditIcon /></Button> : ''}
                                    
                            </h4>
                            <div className="d-none d-md-block">
                                <form onSubmit={handleSubmit}>
                                    { getInputFields }

                                    <div className="row ">
                                    
                                        <div className="col-4 text-monospace my-auto">
                                            Courses
                                        </div>
                                        <div className="col-8 mt-3">
                                            <MultipleSelect disabled={!state.editAbout} handleCourseChange={handleCourseChange} courses={state.courses} />
                                        </div>
                                        <br />
                                    </div>
                                    {getAboutUpdate()}
                                </form>
                            </div>
                        
                            <div className="d-block d-md-none">
                                <form onSubmit={handleSubmit}>
                                    { getInputFieldSmall }

                                    <div className="row ">
                                        <div className="col-12 mt-3">
                                            <MultipleSelect disabled={!state.editAbout} handleCourseChange={handleCourseChange} courses={state.courses} />
                                        </div>
                                        <br />
                                    </div>
                                    { getAboutUpdate() }
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
