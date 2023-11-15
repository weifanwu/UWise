import React, { useEffect } from 'react';
import "./Login.css";
export default function Log(props) {

    return <>
        <div className={(props.isModalOpen ? " showModal" : "hiddenModal")} onClick={() => {
            props.setIsModalOpen();
        }}>
            <div className='login'>
                <div><img style={{ marginLeft: "50px",width: "40px", height: "40px" }} src="../images/uwise5.png" className="logo" /><span style={{ font: "50px" }}>UWise 登录</span></div>
                <button onClick={() => {
                    window.open("https://uwise.onrender.com/auth/google", "_self");
                }} style={{ marginTop: "8px",border: "1px solid black", borderRadius: "6px", width: "280px" }} class="btn btn-outline-dark"><img style={{ width: "30px", height: "30px", marginRight: "10px" }} src='../images/google.png'></img>Google Login</button>
            </div>
        </div>
    </>
}
