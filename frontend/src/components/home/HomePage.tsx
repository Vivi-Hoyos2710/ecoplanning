import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import LoginFondo from './LoginFondo';
const DriverApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Pagee</h1>} />
        <Route path="login" element={<Login/>}/>
        <Route path="fondo" element={<LoginFondo/>}/>
      </Routes>
    </BrowserRouter>
  );
};
export default DriverApp;
