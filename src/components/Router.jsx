import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// pages import
import Layout from './Layout';
import Achievements from '../pages/Achievements';

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route exact path="/" element={<Achievements />} />
        <Route exact path="/achievements" element={<Achievements />} />
        <Route exact path="/profile" element={<Achievements />} />
        <Route exact path="/discover" element={<Achievements />} />
      </Route>

      {/* redirect wrong URLs to root */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Router;
