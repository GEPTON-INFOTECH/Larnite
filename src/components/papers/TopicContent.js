import React from 'react'

function TopicContent(props) {
    return (
        <div>
            {props.match.params.topicName} topic Syllabus / Contents will be displayed here
        </div>
    )
}

export default TopicContent
