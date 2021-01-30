import React,{ useEffect,useState } from 'react'

function Papers(props) {
    const [state,setState] = useState({
        paperName: ''
    });

    useEffect(()=>{
        setState({
            ...state,
            paperName: props.match.params.paperName
        })
    },[])

    return (
        <div>
            
        </div>
    )
}

export default Papers
