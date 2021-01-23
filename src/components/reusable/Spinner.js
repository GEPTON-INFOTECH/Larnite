import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

function Spinner() {
    return (
        <CircularProgress className="mt-2" disableShrink />
    )
}

export default Spinner
