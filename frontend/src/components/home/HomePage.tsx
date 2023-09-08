import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
const Homepage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Pagee</h1>} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Homepage;
