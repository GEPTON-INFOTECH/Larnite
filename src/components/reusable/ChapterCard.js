import React from 'react'
import { Button, Card, CardContent} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Compass from '../../images/compass.png';
import '../../App.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

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
                <Button class="read-more btn mt-2">
                    <span class="circle">
                    <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">Read More</span>
                </Button>
            </CardContent>
        </Card>
    )
}

export default ChapterCard
