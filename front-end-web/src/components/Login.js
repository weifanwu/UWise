import React, { useEffect } from 'react';
import "./Login.css";

export default function Log(props) {

    var YOUR_CLIENT_ID = "73295202240-g4r4fqevidd18jjvoinih26ng5f5cd59.apps.googleusercontent.com";

    useEffect(() => {

        /* global google */ 

        google.accounts.id.initialize({
          client_id: YOUR_CLIENT_ID,
          callback: props.handleCredentialResponse
        });

        // Display the Sign In With Google Button
        google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { theme: 'outline', size: 'large' }
        );

    }, []);

    return <>
        <div className={(props.isModalOpen ? " showModal" : "hiddenModal")} onClick={() => {
            props.setIsModalOpen();
        }}>
            <div className='log-content'>
                <h3>Google登陆</h3>
                <div id='buttonDiv'></div>
            </div>
        </div>
    </>
}