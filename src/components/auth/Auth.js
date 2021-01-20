import React,{ useEffect,useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import UpdateProfile from './UpdateProfile';

function Auth(props) {
    const [state,setState] = useState({
        authType: 'Sign In',
        OTPState: false,
        showOTP: false,
        phone: '',
        OTP: '',
        buttonText: 'GET OTP',
        updateDetails: false
    });

    // DETERMINES THE PAGE TYPE FROM URL
    useEffect(() => {
        if(props.match.url.includes('signin')) 
            setState({
                ...state,
                authType: 'Sign In',
                updateDetails: false
            });
        else 
            setState({
                ...state,
                authType: 'Sign Up',
                updateDetails: false
            });
    },[])

    // SHOWS THE HIDDEN OTP
    const handleClickShowOTP = () => {
        setState({...state,showOTP:!state.showOTP});
    }

    // HANDLING THE INPUTS IN INPUT BOXES
    const handleChange = ($event) => {
        setState({
            ...state,
            [$event.target.name]: $event.target.value
        });
    }

    const handleSubmit = ($event) => {
        $event.preventDefault();
        // GENERATE OTP FROM FIREBASE
        if(!state.OTPState){
            setState({
                ...state,
                OTPState: true,
                buttonText: 'Verify'
            });
        } else {
            // VERIFY OTP
            // IF TRUE
            if(state.authType == 'Sign Up' && true){
                setState({
                    ...state,
                    updateDetails: true
                })
            }
            
        }
    }


    const resendOTP = () => {
        console.log('RESEND OTP CLICKED');
    }

    const getOTPInputBox = () => {
        return state.OTPState ? (
            <div>
                <Typography variant="body2" component="p" className="mt-2 w-75 text-center mb-2">
                    Enter OTP sent to your mobile number 
                </Typography>
                <TextField 
                    name="OTP"
                    type={state.showOTP ? 'text': 'password'}
                    label="OTP"
                    variant="outlined" 
                    color="primary"
                    placeholder="OTP"
                    InputProps={{ // <-- This is where the toggle button is added.
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowOTP}
                            >
                                {state.showOTP ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        )
                        }}
                    className="w-75 text-center p-0 "
                    >
                </TextField>
                <br />
                <Button 
                    type="button"
                    onClick={resendOTP} 
                    color="primary" 
                    className="mt-2 text-center mb-2">
                    Resend OTP 
                </Button>
            </div>
        ) : <div></div>
    }
    return (
        // AUTH FORM
        <div className="container mt-0 mt-md-5  text-center">
            <div className="row mt-0 mt-md-5 pt-5 mb-5">
                <div 
                    className="
                    col-lg-6 col-md-8
                    col-sm-10 col-12 
                    offset-lg-3 offset-md-2
                    offset-sm-1 mt-0 mt-md-5"
                >
                {state.updateDetails == false ? 
                    <Card className="text-center">
                    <CardContent className="w-100">
                        <Typography variant="h4" component="h2">
                            { state.authType }
                        </Typography>
                        <Typography variant="body2" component="p" className="mt-2 mb-3">
                            We will send you 
                            <b> One Time Password </b>
                            on your phone number   
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            {/* PHONE NUMBER */}
                            <TextField 
                                    minLength="10"
                                    maxLength="10"
                                    name="phone"
                                    type="number"
                                    label="Phone Number"
                                    variant="outlined" 
                                    color="primary"
                                    placeholder="Phone Number"
                                    className="w-75 text-center p-0 mb-3"
                                    onInput={handleChange}
                                    value={state.phone}
                                    >

                                </TextField>
                                <br />
                            {/* END OF PHONE NUMBER */}

                            {/* OTP */}
                            { getOTPInputBox() }
                            
                            {/* END OF OTP */}
                                <Button 
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    className="mt-2 w-75 py-2"
                                    >
                                        { state.buttonText }
                                </Button>
                            </form>
                        {
                            state.authType === 'Sign In' ? 
                            <p>
                                Don't have an account ?
                                <Link to="/signup" className="text-primary text-decoration-none"> Sign Up Here</Link>
                            </p> : 
                            <p>
                            Already have an account ?
                                <Link to="/signin" className="text-primary text-decoration-none"> Sign In Here</Link>
                            </p>
                        }
                    </CardContent>
                    </Card>
                    : <UpdateProfile />
                }
               </div>
            </div>
        </div>
    )
}

export default Auth
