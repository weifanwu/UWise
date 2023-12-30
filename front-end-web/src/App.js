import React, { useState, useEffect } from 'react';
import {message} from 'antd';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import Student from './components/pages/newStudent';
import ClassHome from './components/pages/Class';
import ResourceMap from './components/pages/ResourceMap';
import Profile from './components/pages/Profile';
import Payment from './components/pages/Payment';
import {Dr} from './components/pages/Dr';
const host = process.env.REACT_APP_BACKEND_HOST;

function App() {
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classNames, setClasses] = useState();
  const ProtectedRoute = ({ children }) => {
    if (profile) {
      return children;
    } else {
      return <h1>请先登录！</h1>;
    }

  };

  const getClasses = () => {
    fetch(host + "/auth/getClasses", {
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



  useEffect(() => {
    if (!window.location.pathname.includes("mobile") && /(Mobile)/i.test(navigator.userAgent)) {
      message.warning("最佳效果请在电脑端查看哦～");
    }
    if (profile) {
      getClasses();
    }
    const getUser = () => {
      fetch(host + "/auth/login/success", {
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
    getUser();
  }, []);

  return (
    <>
      <Router>
        <Navbar email={profile ? profile.email : ""} getClasses={getClasses} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} picture={(profile) ? profile.picture : ""} />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/classes' element={<Services />} />
          <Route path='/reviews' element={<Products />} />
          <Route path='/class/:id' element={<ProtectedRoute><ClassHome /></ProtectedRoute>} />
          <Route path='/payment' element={<Payment isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} userInfo={profile} classNames={classNames} />} />
          <Route path='/resources' element={<Student />} />
          <Route path='/map' element={<ResourceMap />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/news' element={<Dr />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;