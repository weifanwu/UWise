import React from "react";
import { useLocation } from 'react-router-dom'

function Profile(props) {
    const location = useLocation()
    const { info } = location.state
    return <>
        <div>
            <h3>姓: {info.lastName} </h3>
            <h3>名: {info.firstName} </h3>
            <h3>头像：</h3>
            <img style={{ height: "20vh", width: "20vh"}} src={info.image} />
            <p>简介：一个字，帅！</p>
        </div>
    </>
}

export default Profile;