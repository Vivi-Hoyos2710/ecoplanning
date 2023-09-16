import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BatteryCareTips from './BatteryCareTips';
const DriverApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Driver App</h1>} />
        <Route path="bct" element={< BatteryCareTips />} />
      </Routes>
    </BrowserRouter>
  );
};
export default DriverApp;
