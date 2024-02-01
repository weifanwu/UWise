import React, { useState } from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';

function Footer() {
  return (
    <div className='footer-container'>
        <div class="content">
            <div class='footer-logo'>
                <Link to='/' className='social-logo'>
                    <div>UWise</div>
                    <div>华大优智</div>
                    <img src="../images/uwise5.png" className="logo" />
                </Link>
            </div>
            <div id="contact">
                <h3>联系我们:</h3>
                <p>@ 邮件: admin@uwise.org</p>
                <div class="contact-info">
                    <img src="../images/微信公众号平台logo.png" className="contact-logo" />
                    <p>微信公众号: 华大优智</p>
                </div>
            </div>
        </div>
        <div class='website-rights'>
            <small>UWise华大优智 © 2024</small>
        </div>
    </div>
  );
}

export default Footer;
