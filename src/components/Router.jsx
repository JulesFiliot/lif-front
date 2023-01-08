import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// pages import
import App from '../pages/App';
import Layout from './Layout';

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route exact path="/" element={<App />} />
        <Route exact path="/achievements" element={<App />} />
        <Route exact path="/profile" element={<App />} />
        <Route exact path="/discover" element={<App />} />
      </Route>

      {/* redirect wrong URLs to root */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Router;
