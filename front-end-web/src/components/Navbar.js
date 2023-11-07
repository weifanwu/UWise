import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Login from "./Login";
import { Dropdown, Space, Divider, Button, theme, Input } from 'antd';
import { useDispatch } from "react-redux";
import { incrementAsync } from "../redux/slices";
import { useSelector } from 'react-redux';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [log, setLog] = useState(false);
  const [info, setInfo] = useState({});
  const [inputValue, setInputValue] = useState('');

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
  }, [])

  const { token } = useToken();

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  }

  function removeCode() {
    fetch('http://localhost:8000/buy/removeCode', {
      method: 'POST',
      credentials: "include",
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
            {/* <li className='nav-item'>
              <Link
                to='/newStudent'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                华大资源
              </Link>
            </li> */}
            {/* <li className='nav-item'>
              <Link
                to='/news'   
                className='nav-links'
                onClick={closeMobileMenu}
              >
                新闻
              </Link>
            </li> */}
            {/* <li className='nav-item'>
              <Link
                to='/resources'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                静态资源
              </Link>
            </li> */}
            <li className='nav-item' data-bs-toggle="dropdown">
                <Dropdown
                  dropdownRender={() => (
                    <div style={contentStyle}>
                      <Input
                      onChange={handleChange}
                      placeholder="请输入激活码" />
                      <Divider style={{ margin: 0 }} />
                      <Space style={{ padding: 8 }}>
                        <Button onClick={() => {
                          props.getClasses();
                          fetch('http://localhost:8000/buy/addClass', {
                            method: 'POST',
                            credentials: "include",
                            body: JSON.stringify({ secret: inputValue, email: props.email }),
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              "Access-Control-Allow-Credentials": true,
                            },
                          })
                          .then(response => response.text())
                          .then(() => {
                            removeCode();                            
                            dispatch(incrementAsync());
                          })
                          .catch(error => {
                              console.error('Error:', error);
                          });
                        }} type="primary">激活</Button>
                      </Space>
                    </div>
                  )}
                >
                <Link
                to='/services'
                className='nav-links'
                >课程</Link>
                </Dropdown>
            {/* </li>
            <li className ='nav-item'>
              <Link
                to='/map'
                className='nav-links'
              >
                HuskyMap
              </Link> */}
            </li>
          </ul>
          <div>
            {button && (props.picture !== "" ? 
              <Link to="/login" state={{ "info" : info }} >
                <img style={{ height: "5vh", width: "5vh"}} src={props.picture} /> 
              </Link>
            : <button buttonStyle='btn--outline' onClick={() => {
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