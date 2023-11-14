import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DefaultSidebar } from './DefaultSideBar';
import { StationsController } from './views/Stations/StationsController';
import { IndexCars } from './views/BrandModel/IndexCars';
import { AdminCars } from './views/AdminCars/AdminCars';
import { Dashboard } from './views/Dashboard';
import { CarDashboard } from './views/CarDashboard';
const AdminApp = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <DefaultSidebar/>
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stations" element={<StationsController />} />
            <Route path="/brand_models" element={<IndexCars />} />
            <Route path="/admin_cars" element={<AdminCars />} />
            <Route path='/admin_cars/:license_plate' element={<CarDashboard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default AdminApp;
