import React from 'react'
import { Button} from '@material-ui/core';
import '../../App.css';

function AnimateButton({text}) {
    return (
        <Button class="read-more btn mt-2">
            <span class="circle">
            <span class="icon arrow"></span>
            </span>
            <span class="button-text">{text}</span>
        </Button>
    )
}

export default AnimateButton
