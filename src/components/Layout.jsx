import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/components/layout.scss';

function Layout() {
  return (
    <div className="layout-content-container">
      {/* // todo - add header */}
      <Outlet />
    </div>
  );
}

export default Layout;
