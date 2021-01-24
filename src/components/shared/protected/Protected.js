import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router';

function Protected({component,...props}) {
    const user = useSelector(state => state.uReducer);
    const Component = component;
    return (
            (user.isLoggedIn == true) ? 
                <Component {...props} /> : 
                <Redirect to="/signin" {...props} />
    )
}

export default Protected
