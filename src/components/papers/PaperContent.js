import React,{ useEffect } from 'react'

function PaperContent(props) {

    useEffect(() => {
        console.log(props);
    }, [])

    return (
        <div>
            {props.match.params.paperName} Syllabus for this paper will be displayed
        </div>
    )
}

export default PaperContent;
