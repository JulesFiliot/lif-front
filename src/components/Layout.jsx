import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/components/layout.scss';

function Layout() {
  return (
    <div className="layout-container">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
