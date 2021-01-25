import React from 'react'
import '../../App.css';

function AnimateButton({text}) {
    return (
        <button className="read-more btn mt-2">
            <span className="circle">
            <span className="icon arrow"></span>
            </span>
            <span className="button-text">{text}</span>
        </button>
    )
}

export default AnimateButton
