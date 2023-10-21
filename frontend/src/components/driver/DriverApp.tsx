import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BatteryCareTips from './BatteryCareTips';
import MapView from './MapView';
import UserSettings from './UserSettings';
import VehicleStatistics from'./VehicleStatistics';
const DriverApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapView />} />
        <Route path="bct" element={<BatteryCareTips/>} />
        <Route path="settings" element={<UserSettings/>} />
        <Route path="statistics" element={<VehicleStatistics/>} />
      </Routes>
    </BrowserRouter>
  );
};
export default DriverApp;
