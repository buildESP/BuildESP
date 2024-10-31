// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css'

// Import Component
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Home from './component/home/Home';
import Profile from './component/profile/Profile';
import Products from './component/products/Poducts';
import Demand from './component/demand/Demand';



function App() {
  return (
    <Router> {/* Wrap the application in BrowserRouter */}
      <div className="App">
        <Header /> {/* This will now have access to the Router context */}
        <div style={{ padding: '20px' }}>
          <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/demand" element={<Demand />} />  
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
