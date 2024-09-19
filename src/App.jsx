import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IntroPage from './pages/IntroPage/index.jsx';
import RegisterPage from './pages/RegisterPage/index.jsx';
import LoginPage from './pages/LoginPage/index.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/register" element={<RegisterPage/>} />  
        <Route path="/login" element={<LoginPage/>} />  
      </Routes>
    </div>
  );
}

export default App;
