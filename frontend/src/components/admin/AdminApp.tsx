import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminHome } from './AdminHome';
const AdminApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminHome />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AdminApp;
