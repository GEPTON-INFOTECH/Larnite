import React,{ useEffect,useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import UpdateProfile from './UpdateProfile';
import firebase from '../../firebase/firebase';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './Auth.css';
import SnackbarComponent from '../reusable/SnackbarComponent';
import Spinner from '../reusable/Spinner';

function Auth(props) {
    const [state,setState] = useState({
        authType: 'Sign In',
        phone: '',
        OTP: '',
        updateDetails: false,
        loading: false,
        open: false,
        message: ''
    });

    window.recaptchaWrapperRef = null;

    // DETERMINES THE PAGE TYPE FROM URL
    useEffect(() => {
       
    },[])

    const handleRecaptch = ($event) => {
        $event.preventDefault();
        if ( window.appVerifier &&  window.recaptchaWrapperRef) {
            window.appVerifier.clear()
            window.recaptchaWrapperRef.innerHTML = `<div id="recaptcha"></div>`
          }
        // VERIFY OTP
        window.appVerifier = new firebase.auth.RecaptchaVerifier("recaptcha",{
            'size': 'invisible',
        });
        handleSubmit();
    }

    const handleSubmit = () => {
            setState({
                ...state,
                loading: true
            })
            firebase.auth().signInWithPhoneNumber(`+${state.phone}`, window.appVerifier)
            .then(function (confirmCode) {
                let OTP = window.prompt('Enter the OTP you received','');
                if(OTP != null){
                    confirmCode.confirm(OTP)
                    .then(async res => {
                        setState({
                            ...state,
                            updateDetails: res.additionalUserInfo.isNewUser,
                            loading: false
                        }); 

                        if(!res.additionalUserInfo.isNewUser){
                            let db = firebase.firestore();
                            let data = await db.collection('students').doc(`+${state.phone}`).get();
                            console.log(data.data());
                            if(data.data() == undefined) {
                                setState({
                                    ...state,
                                    updateDetails: true
                                }); 
                            } else {
                                props.history.push('/');
                            }
                        }
                        window.appVerifier.reset();
                    })
                    .catch(err => {
                        console.log(err);
                        setState({
                            ...state,
                            loading: false,
                            open: true,
                            message: err.message
                        })
                        window.appVerifier.reset();
                        console.log(err);
                    })
                }
            })
            .catch(function (error) {
                setState({
                    ...state,
                    loading: false,
                    open: true,
                    message: error.message
                })
                console.log(error);
            });           
    }

    const handleClose = () => {
        setState({
            ...state,
            open: false,
            message: ''
        })
    }

    return (
        // AUTH FORM
        <div className="container mt-0 mt-md-5  text-center">
            <div className="row mt-0 mt-md-5 pt-5 mb-5">
            <SnackbarComponent open={state.open} message={state.message} handleClose={handleClose} />
            {state.updateDetails == false ? 
                <div 
                    className="
                    col-lg-6 col-md-8
                    col-sm-10 col-12 
                    offset-lg-3 offset-md-2
                    offset-sm-1 mt-0 mt-md-5"
                >
                    <Card className="container text-center">
                    <CardContent className="w-100">
                        <Typography variant="h4" component="h2">
                            { state.authType }
                        </Typography>
                        <Typography variant="body2" component="p" className="mt-2 mb-3">
                            We will send you 
                            <b> One Time Password </b>
                            on your phone number   
                        </Typography>
                        <form className="text-center form-auth" onSubmit={handleRecaptch}>
                            {/* CAPTCHA */}
                            <div ref={ref => window.recaptchaWrapperRef = ref}>
                                <div id="recaptcha"></div>
                            </div>
                            {/* END OF CAPTCHA */}
                            {/* PHONE NUMBER */}
                            <div className="row">
                                <div className="col-md-10 offset-md-1">
                                    <PhoneInput
                                        country={'in'}
                                        value={state.phone}
                                        onChange={phone => setState({...state, phone })}
                                        />
                                </div>
                            </div>
                            {/* END OF PHONE NUMBER */}

                            { state.loading == false ?
                                <Button 
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    className="mt-4 w-75 py-2">
                                        GET OTP
                                </Button> : <Spinner />
                            }
                           </form>
                    </CardContent>
                    </Card>
                </div>
               : 
                <UpdateProfile phone={`+${state.phone}`} />
                }
            </div>
        </div>
    )
}

export default Auth
