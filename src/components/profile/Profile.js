import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import '../../App.css';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import TextFieldComponent from '../reusable/TextFieldComponent';
import UpdateProfileData from '../data/UpdateProfile';
import MultipleSelect from '../reusable/MultipleSelect';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnack, fetchUser, updateProfile, updateBio } from '../../redux/profile/Actions';
import SnackbarComponent from '../reusable/SnackbarComponent';
import DialogComponent from '../reusable/DialogComponent';
import AvatarComponent from '../reusable/AvatarComponent';
import Stats from './Stats';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { CountryData } from '../data/CountryData';

function Profile(props) {
    const [state,setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        courses: [],
        editBio: false,
        editAbout: false,
        bio: 'Beatae pariatur neque recusandae! Exercitationem laborum voluptatibus repellat accusantium laudantium, consequuntur asperiores quisquam non, expedita ipsum possimus nam',
        editBioValue: 'Beatae pariatur neque recusandae! Exercitationem laborum voluptatibus repellat accusantium laudantium, consequuntur asperiores quisquam non, expedita ipsum possimus nam',
        dialogOpen: false,
        examDates: [],
        examDate: [],
        country: ''
    });
    const [countries,setCountries] = useState(CountryData);

    const profile = useSelector(state => state.pReducer);
    const user = useSelector(state => state.uReducer);
    const dispatch = useDispatch();

    useEffect(async () => {
        setState({
            ...state,
            firstName: user.user.firstName,
            lastName: user.user.lastName,
            email: user.user.email,
            courses: user.user.course,
            bio: user.user.bio,
            editBioValue: user.user.bio,
            examDates: user.user.courseExamDate,
            examDate: user.user.courseExamDate,
            country: user.user.country
        });

        if(user.isLoggedIn == false) {
            props.history.push('/');
        }

    },[]);

    const handleCountryChange = (event) => {
        console.log(event);
        setState({
            ...state,
            country: event.target.value
        })
    }

    const handleChange = ($event) => {
        setState({
            ...state,
            [$event.target.name]: $event.target.value
        });
    }

    const handleClose = () => {
        dispatch(closeSnack());
    }

    const handleDialogOpen = () => {
        setState({
            ...state,
            dialogOpen: true
        })
    }
    const handleDialogClose = () => {
        setState({
            ...state,
            dialogOpen: false
        })
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
        dispatch(updateProfile({...state,examDate: examDates},user.user.phone));
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
                            onClick={handleSubmit}
                            color="primary"
                            className="theme-background"
                            variant="contained"
                            >
                                Update
                        </Button>
                </div> : ''}
                </>
        )
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


    const getDatePickers = state.courses.map((c, idx) =>{
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
                value={date}
                id={c}
                type="date"
                label={c + " Exam Date"}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={setDate}
                disabled={!state.editAbout}
            />
        )
    })


    return (
        <div className="container">
            <SnackbarComponent 
                open={profile.open} 
                message={profile.message}
                handleClose={handleClose}
                />

            {/* FULL WIDTH DIALOG */}
            <DialogComponent 
                alreadySelected={{ cover: user.user?.cover,avatar: user.user?.avatar}}
                phone={user.user?.phone}
                cover={user.user?.cover || ''}
                open={state.dialogOpen} 
                handleClose={handleDialogClose} />
            {/* END OF WIDTH DIALOG */}
            <div className="row">
                <div className="col-md-5 col-12 mt-3">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-12 position-relative mt-5">
                            <AvatarComponent bg={user.user?.cover} image={user.user?.avatar} /> 
                            <br />
                            <br />
                            <br />
                            <Button 
                                variant="contained" 
                                size="small"
                                className="upload-avatar"
                                onClick={handleDialogOpen}
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
                                                className="theme-background"
                                                onClick={updateBioForm}
                                                >
                                                    Update
                                            </Button>
                                        </div>
                                    </div>
                                    :
                                    <div className="text-left profile-help-text">
                                        {user.user.bio}
                                        <p className="text-right mt-2">
                                            <Button
                                                color="primary" 
                                                variant="text" 
                                                onClick={editBio}
                                                startIcon={<EditIcon />}>
                                                    Edit Bio
                                            </Button>
                                        </p>
                                    </div>
                                }

                                </CardContent>
              
                            </Card>
                    {/* END OF PROFILE CARD */}
                        </div>
                    </div>                    
                </div>
                <div className="col-md-7 col-12 text-left position-relative">


                    {/* EXP CARD */}
                    <Stats user={user?.user}/>
                    {/* END OF EXP CARD */}

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
                                        Country
                                    </div>
                                    <div className="col-8 mt-3">
                                        <FormControl className="w-100 mt-2">
                                        {/* COUNTRY FIELD */}
                                        <InputLabel id="country-select">Country</InputLabel>
                                        <Select disabled={!state.editAbout} labelId="country-select" required  value={state.country} onChange={handleCountryChange}>
                                            {
                                                countries.map((c,idx) => (
                                                    <MenuItem value={c} key={idx}>{c}</MenuItem>
                                                ))
                                            }

                                        </Select>
                                        </FormControl>
                                        {/* END OF COUNTRY FIELD */}                                    </div>
                                    <br />

                                </div>
                                    

                                    <div className="row ">
                                    
                                        <div className="col-4 text-monospace my-auto">
                                            Courses
                                        </div>
                                        <div className="col-8 mt-3">
                                            <MultipleSelect disabled={!state.editAbout} handleCourseChange={handleCourseChange} courses={state.courses} />
                                        </div>
                                        <br />

                                    </div>
                                    <br />
                                    {getDatePickers}

                                    {getAboutUpdate()}
                                </form>
                            </div>
                        
                            <div className="d-block d-md-none">
                                <form onSubmit={handleSubmit}>
                                    { getInputFieldSmall }

                                    <FormControl className="w-100">
                                        {/* COUNTRY FIELD */}
                                        <InputLabel id="country-select">Country</InputLabel>
                                        <Select disabled={!state.editAbout} labelId="country-select" required  value={state.country} onChange={handleCountryChange}>
                                            {
                                                countries.map((c,idx) => (
                                                    <MenuItem value={c} key={idx}>{c}</MenuItem>
                                                ))
                                            }

                                        </Select>
                                        </FormControl>
                                        {/* END OF COUNTRY FIELD */}

                                    <div className="row ">
                                        <div className="col-12 mt-3">
                                            <MultipleSelect disabled={!state.editAbout} handleCourseChange={handleCourseChange} courses={state.courses} />
                                        </div>
                                        <br />
                                    </div>
                                    <br />
                                    {getDatePickers}

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
