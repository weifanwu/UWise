import React, { useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer(props) {
  const viewers = ["weifan@uw.edu", "shipeh@uw.edu"]
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
                <div class="contact-info">
                    <img src="../images/wechatlogo.png" className="contact-logo" />
                    <p>微信小助手：UWiseedu</p>
                </div>
                <div class="contact-info">
                    <img src="../images/instaLogo.png" className="contact-logo" />
                    <p>Instagram: uwiseedu</p>
                </div>
                <div class="contact-info">
                    <img src="../images/RedLogo.png" className="contact-logo" />
                    <p>小红书: UWise华大优智(ID：8334742874)</p>
                </div>
                <div class="contact-info">
                    <img src="../images/tiktokLogo.png" className="contact-logo" />
                    <p>抖音：UWise2023</p>
                </div>
            </div>
        </div>
        <div class='website-rights'>
            <small>UWise华大优智 © 2024</small>
        </div>
        <div style={{ display: viewers.includes(props.email) ? "block" : "none", color: 'white' }}>
            <p>总访问量: <span id="qiushaocloud_sitecounter_value_site_pv">n</span></p>
            <p>总访客量: <span id="qiushaocloud_sitecounter_value_site_uv">n</span></p>
            <p>今日访问量: <span id="qiushaocloud_sitecounter_value_today_site_pv">n</span></p>
            <p>今日访客量: <span id="qiushaocloud_sitecounter_value_today_site_uv">n</span></p>
        </div>
    </div>
  );
}

export default Footer;