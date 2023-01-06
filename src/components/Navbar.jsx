import React from 'react';
import { t } from 'i18next';
import lifLogo from '../assets/lif_logo.png';
import '../styles/components/navbar.scss';
import BackBtn from './ui/BackBtn';
import BurgerMenu from './ui/BurgerMenu';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <BackBtn />
      <img src={lifLogo} alt="LIF Logo" className="logo" />
      <BurgerMenu items={[
        { name: t('navbar.profile'), link: '/test1' },
        { name: t('navbar.achievements'), link: '/test2' },
        { name: t('navbar.discover'), link: '/test3' },
        { name: t('navbar.logout'), link: '/test4' },
      ]}
      />
    </div>
  );
}
