import React from 'react'
import { Card, CardContent} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Compass from '../../images/compass.png';
import '../../App.css';
import AnimateButton from './AnimateButton';

function ChapterCard() {
    return (
        <Card className="w-100 mx-0 mx-sm-2 chapter-card shadow">
            <CardContent>
                <Icon>
                    <img src={Compass} width="80" />
                </Icon>
                <h4 className="chapter-title pb-0 mb-0 mt-2">
                    Geometry
                </h4>
                <p className="chapter-intro">
                    Lorem ipsum, dolor sit amet consectetur 
                    adipisicing elit. Eveniet vel in quae
                    architecto nisi dolorum. Sint corporis
                </p>
                <AnimateButton text="Read More" />
            </CardContent>
        </Card>
    )
}

export default ChapterCard
