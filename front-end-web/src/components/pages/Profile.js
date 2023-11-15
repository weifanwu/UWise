import React from "react";
import { useLocation } from 'react-router-dom';
import { Button } from "antd";
function Profile(props) {
    const location = useLocation();
    const { info } = location.state;

    return (
        <>
            <div style={{ background: '#F4F6F6' }}>
                <div style={{ background: 'white', margin: "10px 200px", padding: '20px', borderRadius: '8px' }}>
                    <div>
                        <img src="images/uwise-profile.png" style={{ marginLeft: "200px", width: "500px" }} />
                    </div>
                    <Button style={{ marginLeft: "370px" }} onClick={async () => {
                        window.open("https://uwise.onrender.com/auth/logout", "_self");
                    }}>Google登出</Button>
                </div>

            </div>

        </>
    );
}

export default Profile;
