import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

// pages import
import Layout from './Layout';
import Achievements from '../pages/Achievements';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { setAxiosHeaders } from '../config/config';

function Router() {
  const token = useSelector((state) => state.userReducer.token);

  useEffect(() => setAxiosHeaders(token), [token]);

  return (
    <Routes>
      <Route element={<ProtectedRoute isLoggedIn redirectTo="/profile" />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute redirectTo="/login" />}>
        <Route element={<Layout />}>
          <Route exact path="/achievements" element={<Achievements />} />
          <Route exact path="/profile" element={<Achievements />} />
          <Route exact path="/discover" element={<Achievements />} />
        </Route>
      </Route>

      {/* redirect wrong URLs to root */}
      <Route path="*" element={<Navigate to="/profile" />} />
    </Routes>
  );
}

export default Router;
