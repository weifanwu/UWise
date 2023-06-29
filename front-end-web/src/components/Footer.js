import React, { useState } from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';

function Footer() {
  return (
    <div className='footer-container'>
        <div class='footer-logo'>
            <Link to='/' className='social-logo'>
            UWise华大优智
                <img src="../images/uwise5.png" className="logo" />
            </Link>
        </div>
        <div id="contact">
            <h3>联系我们:</h3>
            <p>邮件: admin@uwise.org</p>
            <p>微信公众号: 华大优智</p>
        </div>
        <div class='website-rights'>
            <small>UWise华大优智 © 2023</small>
        </div>
    </div>
  );
}

export default Footer;
