import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const DriverApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Driver App</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default DriverApp;
