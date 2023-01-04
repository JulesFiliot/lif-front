import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// pages import
import App from '../pages/App';

function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<App />} />

      {/* redirect wrong URLs to root */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Router;
