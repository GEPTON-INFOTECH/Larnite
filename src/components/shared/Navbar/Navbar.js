import React, { useState,useEffect } from 'react'
import './Navbar.css';
import { NavItems } from '../../data/Navbar';
import { Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import SnackbarComponent from '../../reusable/SnackbarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar, logout } from '../../../redux/auth/Actions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';

function Navbar() {
    
    const state = useSelector(state => state.uReducer);
    const [currentState,setCurrentState] = useState({
        menuOpen: false
    });
    const dispatch = useDispatch();
    const history = useHistory();
    // NAV BUTTONS
    const NavItemHTML = NavItems.map((data,val) => (                    
        <li className="nav-item pl-4 pl-md-0 ml-0 mx-md-3 " key={val}>
            <Link className="nav-link" to={data.link}>
                {data.icon}&nbsp;&nbsp;{data.title}
            </Link>
        </li>
    ));

    useEffect(() => {

    },[])

    const handleMenuClose = () => {
        setCurrentState({
            ...state,
            anchorEl: null,
            menuOpen: false
        })
    }

    const handleMenuOpen = ($event) => {
        setCurrentState({
            ...state,
            menuOpen: true,
            anchorEl: $event.currentTarget
        })
    }

    return (
        <div className="Navbar shadow p-3">
            <nav className="navbar navbar-expand-md navbar-light ">
                    {/* NAVBAR LOGO */}
                    <a className="navbar-brand" href="/" target="_blank">
                        Pymaths
                    </a>	
                    {/* END OF NAVBAR LOGO */}
                    {/* TOGGLER BUTTON */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* END OF TOGGLER BUTTON */}
                    <div className="collapse navbar-collapse text-left text-md-center" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto py-4 text-left text-md-center py-md-0">
                            { NavItemHTML }
                        </ul>
                       
                        
                        {/* BUTTON FOR SIGIN */}
                        { (state.user == { } || state.user == null) ? 
                            <Link to="/signin">
                                <Button color="primary" variant="contained" className="ml-0 ml-md-2 px-5 login-button text-left text-md-center ">
                                    Sign In
                                </Button>
                            </Link> 
                            :
                            <div className="my-auto my-profile">
                                {
                                   
                                    <>
                                    <Button 
                                        size="large" 
                                        aria-controls="profile-menu" 
                                        aria-haspopup="true" 
                                        className="" 
                                        onClick={handleMenuOpen}
                                        startIcon={<PersonIcon />}
                                        >
                                           <b className="opacity-text">Welcome,&nbsp;<span className="name-color">{ state.user?.firstName }</span></b>
                                    </Button>
                                    
                                        <Menu
                                            id="profile-menu"
                                            anchorEl={currentState.anchorEl}
                                            keepMounted
                                            open={currentState.menuOpen}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem onClick={() => {handleMenuClose();history.push('/profile')}}>
                                                <EditIcon />&nbsp;&nbsp;Edit Profile
                                            </MenuItem>

                                            <MenuItem onClick={() => {handleMenuClose();dispatch(logout(history))}} >
                                                <ExitToAppIcon />&nbsp;&nbsp;Logout
                                                </MenuItem>
                                        </Menu>
                                  </>
                                }
                            </div>
                        }
                        {/* END OF SIGN IN BUTTON */}
                    </div>
                    
                </nav>	
                <SnackbarComponent open={state.logoutSnackOpen} message={state.error} handleClose={() => dispatch(closeSnackbar())} />	
        </div>
    )
}

export default Navbar
