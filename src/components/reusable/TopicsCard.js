import React from 'react'
import { Card, CardContent} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Compass from '../../images/compass.png';
import '../../App.css';
import AnimateButton from './AnimateButton';
import LinearProgress from '@material-ui/core/LinearProgress';


function TopicsCard({course,paper}) {
    return (
        <Card className="w-100 mx-0 mx-sm-2 chapter-card shadow">
            <CardContent>
                <h4 className="chapter-title pb-0 mb-0 mt-2">
                   { paper.paperName }
                </h4>
                <LinearProgress 
                    style={{height: '10px'}}
                    className="rounded-pill text-left mt-3"
                    variant="determinate" 
                    value={40} /> 
                <p className="text-left">40% Complete</p>
                <AnimateButton text="Read More" />
            </CardContent>
        </Card>
    )
}

export default TopicsCard
