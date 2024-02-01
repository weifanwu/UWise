import React, { useState, useEffect } from 'react';
import {message} from 'antd';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Services from './components/pages/Services';
import CourseReview from './components/pages/CourseReview';
import Student from './components/pages/StaticResources.js';
import ClassHome from './components/pages/Class';
import ResourceMap from './components/pages/ResourceMap';
import Payment from './components/pages/Payment';
import {Dr} from './components/pages/Dr';
import VideoDisplay from './components/pages/VideoDisplay.js';

const host = process.env.REACT_APP_BACKEND_HOST;

function App() {
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classNames, setClasses] = useState();
  const [profileInfo, setProfileInfo] = useState();

  const ProtectedRoute = ({ children }) => {
    if (profile) {
      return children;
    } else {
      return <h1>请先登录！</h1>;
    }
  };

  useEffect(() => {
    if (!window.location.pathname.includes("mobile") && /(Mobile)/i.test(navigator.userAgent)) {
      message.warning("最佳效果请在电脑端查看哦～");
    }
    const script = document.createElement("script");
    script.src = "//githubcdn.qiushaocloud.top/gh/qiushaocloud/site-counter@master/dist/qiushaocloud_site_counter.min.js";
    document.body.appendChild(script);
    localStorage.setItem('qiushaocloud_sitecounter_max_session_duration', 24 * 60 * 60 * 1000);
    getUser();
  }, []);

  useEffect(() => {
    if (profile) {
      getClasses();
      // getProfileInfo();
    }
  }, [profile, profileInfo]);

  const getClasses = async() => {
    await fetch(host + "/auth/getClasses", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: 'include'
    }).then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("authentication has been failed!");
    }).then((allClass) => {
      setClasses(allClass);
    });
  }

  const getUser = async() => {
    await fetch(host + "/auth/login/success", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: 'include'
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        return response.json().then((errorData) => {
          throw new Error(errorData.message);
        });
      })
      .then((resObject) => {
        setProfile(resObject.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getProfileInfo = async() => {
  //   await fetch(`${host}/profile/getProfile?email=${encodeURIComponent(profile.email)}`, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   .then(response => response.json())
  //   .then(data => {setProfileInfo(data);})
  //   .catch(error => console.error(error));
  // }
  
  return (
    <>
      <Router>
        <Navbar profileInfo={profileInfo ? profileInfo : ""} email={profile? profile.email : ""} getClasses={getClasses} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} picture={(profile) ? profile.picture : ""} />
        <Routes>
          <Route path='/' exact element={<Home email={profile ? profile.email : ""}/>} />
          <Route path='/classes' element={<Services isLoggedIn={profile ? true : false} />} />
          <Route path='/reviews' element={<CourseReview />} />
          <Route path='/class/:id' element={<ProtectedRoute ><ClassHome /></ProtectedRoute>} />
          <Route path='/payment' element={<Payment isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} userInfo={profile} classNames={classNames} />} />
          <Route path="/video/:videoId" element={<VideoDisplay/>} />
          <Route path='/resources' element={<Student />} />
          <Route path='/map' element={<ResourceMap />} />
          <Route path='/news' element={<Dr />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;