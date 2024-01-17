import React, { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Login from "./Login";
import { Dropdown, Space, Divider, Button, theme, Input, message } from 'antd';
import { useDispatch } from "react-redux";
import { incrementAsync } from "../redux/slices";
import 'bootstrap/dist/css/bootstrap.css';
import Profile from './pages/Profile';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [log, setLog] = useState(false);
  const [info, setInfo] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const profilePopupRef = useRef();

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  const handleClickOutside = (event) => {
    if (profilePopupRef.current && !profilePopupRef.current.contains(event.target)) {
      setShowProfilePopup(false);
    }
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const { useToken } = theme;

  const dispatch = useDispatch();
  const change = () => {
    props.setIsModalOpen(!props.isModalOpen);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOk = () => {
    props.setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    dispatch(incrementAsync());
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { token } = useToken();
  const host = process.env.REACT_APP_BACKEND_HOST;

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  }

  function removeCode() {
    const host = process.env.REACT_APP_BACKEND_HOST;
    fetch(host + '/buy/removeCode', {
      method: 'POST',
      body: JSON.stringify({ secret: inputValue }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
    .then(response => response.text())
    .then((data) => {
      console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }


  useEffect(() => {
      showButton();
  }, []);

  window.addEventListener('resize', showButton);

  async function handleActivation() {
    props.getClasses();
    try {
      const response = await fetch(host + '/buy/addClass', {
        method: 'POST',
        body: JSON.stringify({ secret: inputValue, email: props.email }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      console.log("this is the response");
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      message.success("兑换成功！");
      removeCode();
      dispatch(incrementAsync());
    } catch (error) {
      message.error("激活码错误❌");
      console.error("There is an error:", error);
    }
  };
  
  
  return (
    <>
      <nav className='nav'>
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
                to='/reviews'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Course Review
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/resources'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                校园指南
              </Link>
            </li>
            <li className='nav-item' data-bs-toggle="dropdown">
                <Dropdown
                  dropdownRender={() => (
                    <div style={contentStyle}>
                      <Input
                      onChange={handleChange}
                      placeholder="请输入激活码" />
                      <Divider style={{ margin: 0 }} />
                      <Space style={{ padding: 8 }}>
                      <Button onClick={handleActivation} type="primary">激活</Button>
                      </Space>
                    </div>
                  )}
                >
                <Link
                to='/classes'
                className='nav-links'
                >课程</Link>
                </Dropdown>
            </li>
            <li className ='nav-item'>
              <Link
                to='/news'
                className='nav-links'
              >
                新闻/活动
              </Link>
            </li>
          </ul>

          <div>
            {button && (
              props.picture !== "" ? 
                <>
                  <img
                    style={{ height: "5vh", width: "5vh", cursor: "pointer" }}
                    src={props.picture}
                    alt="Profile"
                    onClick={toggleProfilePopup}
                  />
                  {showProfilePopup && (
                    <div className="profile-popup" ref={profilePopupRef}>
                      <Profile email={props.email} picture={props.picture}/>
                    </div>
                  )}
                </>
              : <button class="btn btn-light" onClick={() => {
                change();
              }}>登陆/注册</button>)}
          </div>
        </div>
      </nav>
      <Login isModalOpen={props.isModalOpen} setIsModalOpen={() => {
        change();
      }} />
    </>
  );
}

export default Navbar;