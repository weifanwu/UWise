import React, { useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import Student from './components/pages/newStudent';
import ClassHome from './components/pages/Class';
import News from './components/pages/news';
import Resources from './components/pages/Resources';
import ResourceMap from './components/pages/ResourceMap';
import Major from './components/pages/Major';

function App() {
  const [name, setName] = useState("");
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/services' element={<Services update={(classname) => setName(classname)}/>} />
          <Route path='/products' element={<Products />}/>
          <Route path='/class' element={<ClassHome classname={name}/>} />
          <Route path='/newStudent' element={<Student />} />
          {/* <Route path='/resources' element={<Resources />} /> */}
          <Route path='/news' element={<News />} />
          <Route path='/map' element={<ResourceMap />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;