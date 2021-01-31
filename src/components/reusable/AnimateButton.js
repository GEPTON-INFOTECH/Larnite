import React from 'react'
import '../../App.css';

function AnimateButton({text,handleClick}) {
    return (
        <button className="read-more btn mt-2" onClick={handleClick}>
            <span className="circle">
            <span className="icon arrow"></span>
            </span>
            <span className="button-text">{text}</span>
        </button>
    )
}

export default AnimateButton
