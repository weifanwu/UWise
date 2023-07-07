import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Attention  from './attention.js';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

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
            <li className='nav-item'>
              <Link
                to='/newStudent'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                <Attention />
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
            <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
              >
                课程
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline' src="/map">HuskyMap</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
