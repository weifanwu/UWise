import React, { useEffect } from 'react';
import "./Login.css";
export default function Log(props) {
    const host = process.env.REACT_APP_BACKEND_HOST;

    return <>
        <div className={(props.isModalOpen ? " showModal" : "hiddenModal")} onClick={() => {
            props.setIsModalOpen();
        }}>
            <div className='login'>
                <div><img style={{ marginLeft: "50px",width: "40px", height: "40px" }} src="../images/uwise5.png" className="logo" /><span style={{ font: "50px" }}>UWise 登录</span></div>
                <button onClick={() => {
                    window.open(host + "/auth/google", "_self");
                }} style={{ marginTop: "32px",border: "1px solid black", borderRadius: "6px", width: "280px", height: "54px"}} class="btn btn-dark"><img style={{ width: "32px", height: "32px", marginRight: "10px" }} src='../images/google.png'></img>Google Login</button>

                <button onClick={() => {
                    window.open(host + "/auth/wechat", "_self");
                }} style={{ marginTop: "32px", borderRadius: "6px", width: "280px", height: "54px"}} className="custom-btn"><img style={{ width: "36px", height: "36px", marginRight: "20px" }} src='../images/wechat-white.svg'></img>微信登陆</button>

            </div>
        </div>
    </>
}
