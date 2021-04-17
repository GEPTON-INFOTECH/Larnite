import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect,Route } from 'react-router';


function Protected({component,...rest}) {
    const user = useSelector(state => state.uReducer);
    const Component = component;
    return (
        (user.isLoggedIn === true) ? 
        <Route {...rest} render={(props => (<Component {...props}/>))} /> : 
                <Redirect to="/signin" {...rest} />
    )
}

export default Protected
