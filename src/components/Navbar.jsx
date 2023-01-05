import React from 'react';
import lifLogo from '../assets/lif_logo.png';
import '../styles/components/navbar.scss';
import BackBtn from './ui/BackBtn';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <BackBtn />
      <img src={lifLogo} alt="LIF Logo" className="logo" />
    </div>
  );
}
