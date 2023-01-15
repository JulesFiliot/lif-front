import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ redirectTo, isLoggedIn }) {
  const userId = useSelector((state) => state?.userReducer?.id);
  const redirect = isLoggedIn ? userId : !userId;

  if (redirect) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
}
ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool,
};
ProtectedRoute.defaultProps = {
  isLoggedIn: false,
};
