import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AdminApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Admin Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default AdminApp;
