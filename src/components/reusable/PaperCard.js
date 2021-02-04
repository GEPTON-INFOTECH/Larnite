import React,{ useEffect,useState } from 'react'
import { Card, CardContent,Button} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Compass from '../../images/compass.png';
import '../../App.css';
import AnimateButton from './AnimateButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPercentage } from '../../redux/courses/Actions';
import firebase from '../../firebase/firebase';


function PaperCard({course,paper}) {
    const history = useHistory();
    const [state,setState] = useState({
        percentage: 0
    })
    const user = useSelector(state => state.uReducer.user);
    const setCurrent = () => {
        history.push({
            pathname: `/${course.courseName.replace(/\s/g,'-')}/${paper.paperName.replace(/\s/g,'-')}`,
            state: {
                id: paper.home
            }
        });
    }

    useEffect(async () => {
        const db = firebase.firestore();
        let percent = await getPercentage(user.completedTopics,paper.id);
        setState({
            percentage: parseFloat(percent)
        })
    
    }, [])
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
                    value={state?.percentage} /> 
                <p className="text-left mb-2">{ state?.percentage } % Complete</p>
                <AnimateButton text="Read More" handleClick={setCurrent} />
            </CardContent>
        </Card>
    )
}

export default PaperCard;
