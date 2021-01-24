import React from 'react'
import './Navbar.css';
import { NavItems } from '../../data/Navbar';
import { Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import SnackbarComponent from '../../reusable/SnackbarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar, logout } from '../../../redux/auth/Actions';


function Navbar() {
    const state = useSelector(state => state.uReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    // NAV BUTTONS
    const NavItemHTML = NavItems.map((data,val) => (                    
        <li className="nav-item pl-4 pl-md-0 ml-0 mx-md-3 " key={val}>
            <Link className="nav-link" to={data.link}>{data.title}</Link>
        </li>
    ));


    return (
        <div className="Navbar shadow p-3">
            <nav className="navbar navbar-expand-md navbar-light container sticky-top">
                    {/* NAVBAR LOGO */}
                    <a className="navbar-brand" href="https://front.codes/" target="_blank">
                        NavIcon
                    </a>	
                    {/* END OF NAVBAR LOGO */}
                    {/* TOGGLER BUTTON */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* END OF TOGGLER BUTTON */}
                    <div className="collapse navbar-collapse text-left text-md-center" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto py-4 text-left text-md-center py-md-0">
                            { NavItemHTML }
                            { 
                                state.isLoggedIn == false ? '':
                                <li className="nav-item pl-4 pl-md-0 ml-0 mx-md-3 " >
                                    <Link className="nav-link" to='/profile'>My Profile</Link>
                                </li>
                            }
                        </ul>
                        
                        {/* BUTTON FOR SIGIN */}
                        { state.isLoggedIn == false ? 
                            <Link to="/signin">
                                <Button color="primary" variant="contained" className="ml-0 ml-md-2 px-5 login-button text-left text-md-center ">
                                    Sign In
                                </Button>
                            </Link> 
                            :
                            <Button color="primary" variant="contained" onClick={() => dispatch(logout(history))} className="ml-0 ml-md-2 px-5 login-button text-left text-md-center ">
                                Logout
                            </Button>
                        }
                        {/* END OF SIGN IN BUTTON */}
                    </div>
                    
                </nav>	
                <SnackbarComponent open={state.logoutSnackOpen} message={state.error} handleClose={() => dispatch(closeSnackbar())} />	
        </div>
    )
}

export default Navbar
