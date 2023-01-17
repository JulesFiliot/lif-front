import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// pages import
import Layout from './Layout';
import Achievements from '../pages/Achievements';
import Profile from '../pages/Profile';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

function Router() {
  return (
    <Routes>
      <Route element={<ProtectedRoute isLoggedIn redirectTo="/profile" />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute redirectTo="/login" />}>
        <Route element={<Layout />}>
          <Route exact path="/achievements" element={<Achievements />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/discover" element={<Achievements />} />
        </Route>
      </Route>

      {/* redirect wrong URLs to root */}
      <Route path="*" element={<Navigate to="/profile" />} />
    </Routes>
  );
}

export default Router;
