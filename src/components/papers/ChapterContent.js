import React from 'react'

function ChapterContent(props) {
    return (
        <div>
            {props.match.params.chapterName} information will be displayed
        </div>
    )
}

export default ChapterContent
