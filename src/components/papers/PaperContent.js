import React,{ useEffect } from 'react'

function PaperContent(props) {

    useEffect(() => {
        console.log(props);
    }, [])

    return (
        <div>
            {props.id}
        </div>
    )
}

export default PaperContent;
