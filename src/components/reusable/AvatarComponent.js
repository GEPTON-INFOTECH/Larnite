import React from 'react'

function AvatarComponent({bg,image}) {
    return (
        <div className="p-0 text-center position-relative w-100 avatar-demo">
            <img src={bg} className="w-100"/>
            <img src={image} className="profile-image position-absolute bg-white"/>
        </div>
    )
}

export default AvatarComponent
