import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import Student from './components/pages/newStudent';
import ClassHome from './components/pages/Class';
import News from './components/pages/news';
import ResourceMap from './components/pages/ResourceMap';
import Profile from './components/pages/Profile';
import Payment from './components/pages/Payment';

function App() {
  const [name, setName] = useState("");
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classNames, setClasses] = useState();
  const ProtectedRoute = ({ children, classname }) => {
  const navigate = useNavigate();
    // Add your authentication logic here
    console.log()
    if (profile) {
      return children;
    } else {
      return <h1>请先登录！</h1>;
    }

  };

  const getClasses = () => {
    fetch("http://localhost:8000/auth/getClasses", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    }).then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("authentication has been failed!");
    }).then((allClass) => {
      console.log(allClass);
      setClasses(allClass);
    });
  }

  useEffect(() => {
    getClasses();
    const getUser = () => {
      fetch("http://localhost:8000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
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
          <Route path='/services' element={<Services update={setName}/>} />
          <Route path='/products' element={<Products />}/>
          <Route path='/class/:id' element={<ProtectedRoute classname={name}><ClassHome classname={name} /></ProtectedRoute>} />
          <Route path='/payment' element={<Payment isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} classname={name} userInfo={profile} classNames={classNames}/>} />
          <Route path='/newStudent' element={<Student />} />
          {/* <Route path='/resources' element={<Resources />} /> */}
          <Route path='/news' element={<News />} />
          <Route path='/map' element={<ResourceMap />} />
          <Route path='/login' element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;