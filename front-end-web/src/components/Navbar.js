import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Attention  from './attention.js';
import { Modal } from 'antd';
import jwt_decode from 'jwt-decode'

function Navbar() {
  var YOUR_CLIENT_ID = "73295202240-g4r4fqevidd18jjvoinih26ng5f5cd59.apps.googleusercontent.com";
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [log, setLog] = useState(false);
  const [info, setInfo] = useState({});
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("enter");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  function handleCredentialResponse(response) {
      var userObject = jwt_decode(response.credential);
      const image = userObject["picture"];
      const firstName = userObject["family_name"];
      const lastName = userObject["given_name"];
      setInfo( {"image" : image, "firstName" : firstName, "lastName" : lastName } );
      handleOk();
      setLog(true);
  }

  useEffect(() => {
      showButton();

      /* global google */ 

      google.accounts.id.initialize({
        client_id: YOUR_CLIENT_ID,
        callback: handleCredentialResponse
      });
      
      // Display the One Tap prompt
      
      // Display the Sign In With Google Button
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: 'outline', size: 'large' }
      );
      console.log("wefe");
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img src="../images/uwise5.png" className="logo" />
            UWise EDU
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Course Review
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/newStudent'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                华大资源
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/news'   
                className='nav-links'
                onClick={closeMobileMenu}
              >
                新闻
              </Link>
            </li>
            {/* <li className='nav-item'>
              <Link
                to='/resources'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                静态资源
              </Link>
            </li> */}
            {/* <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
              >
                课程
              </Link>
            </li> */}
            <li className='nav-item'>
              <Link
                to='/map'
                className='nav-links'
              >
                HuskyMap
              </Link>
            </li>
          </ul>
          {button && (log ? 
            <Link to="/login" state={{ "info" : info }} >
              <img style={{ height: "5vh", width: "5vh"}} src={info["image"]}/> 
            </Link>
          : <button buttonStyle='btn--outline' onClick={showModal}>登陆/注册</button>)}
        </div>
      </nav>
      <Modal title="登陆 注册" open={isModalOpen} okButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
        <div id='buttonDiv' ></div>
      </Modal>
    </>
  );
}

export default Navbar;
