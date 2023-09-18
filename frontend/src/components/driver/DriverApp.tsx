import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BatteryCareTips from './BatteryCareTips';
import MapView from './MapView';
const DriverApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapView/>} />
        <Route path="bct" element={< BatteryCareTips />} />
      </Routes>
    </BrowserRouter>
  );
};
export default DriverApp;
