import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignIn from './SignIn';
import Home from './Home';
import BatteryCareTips from './BatteryCareTips';

const Homepage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="login" element={<Login />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="bct" element={< BatteryCareTips />} />
      </Routes>
    </BrowserRouter>

  );
};
export default Homepage;
