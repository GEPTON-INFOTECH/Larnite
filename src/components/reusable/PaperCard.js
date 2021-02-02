import React from 'react'
import { Card, CardContent,Button} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Compass from '../../images/compass.png';
import '../../App.css';
import AnimateButton from './AnimateButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCourse, setPaper } from '../../redux/courses/Actions';


function PaperCard({course,paper}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const setCurrent = () => {
        dispatch(setCourse(course));
        dispatch(setPaper(paper));
        history.push({
            pathname: `papers/${paper.paperName.replace(/\s/g,'-')}`,
            state: {
                id: paper.id
            }
        })
    }
    return (
        <Card className="w-100 mx-0 mx-sm-2 chapter-card shadow">
            <CardContent>
                <h4 className="chapter-title pb-0 mb-0 mt-2">
                   { paper.paperName }
                </h4>
                <LinearProgress 
                    style={{height: '10px'}}
                    className="rounded-pill text-left mt-5"
                    variant="determinate" 
                    value={40} /> 
                <p className="text-left mb-2">40% Complete</p>
                <AnimateButton text="Read More" handleClick={setCurrent} />
            </CardContent>
        </Card>
    )
}

export default PaperCard;
