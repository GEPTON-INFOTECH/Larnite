import { Button, Card, CardActions, CardContent, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import '../../App.css';
import SuccessSVG from '../../images/success.svg';
import { Link } from 'react-router-dom';

function Finish() {

    return (
        <div className="container mb-3">
            <div className="row">
            <div className="col-md-6 col-12">
                <img src={SuccessSVG} class="img-fluid"/>
            </div>
            <div className="col-md-6 col-12 text-left my-auto">
                <h1 className="finish-title">Congratulations</h1>
                <h5 className="font-weight-bold">You have successfully completed the chapter</h5>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, delectus. Sit neque totam vel tenetur iure corporis id vero architecto ipsam cupiditate sapiente, minima provident accusantium. Accusamus, iusto aliquid! Quas?</p>
                <Link to="/courses">
                    <Button color="primary" variant="contained">Browse Courses</Button>
                </Link>
            </div>
            </div>
        </div>
    )
}

export default Finish;
