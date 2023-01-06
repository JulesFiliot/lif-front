import React, { useState } from 'react';
import { t } from 'i18next';
import { Link } from 'react-router-dom';
import '../../styles/components/ui/burgerMenu.scss';

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`button-container${isOpen ? ' active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.type === 'keydown' && (e.key === 'Enter' || e.key === ' ')) {
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="top" />
        <div className="middle" />
        <div className="bottom" />
      </div>
      <div className={`overlay${isOpen ? ' open' : ''}`}>
        <nav className="overlay-menu">
          <div><Link to="/">{t('navbar.profile')}</Link></div>
          <div><Link to="/">{t('navbar.achievements')}</Link></div>
          <div><Link to="/">{t('navbar.discover')}</Link></div>
          <div><Link to="/">{t('navbar.logout')}</Link></div>
        </nav>
        {/* <nav className="overlay-menu">
          <ul>
            <li><Link to="/">{t('navbar.profile')}</Link></li>
            <li><Link to="/">{t('navbar.achievements')}</Link></li>
            <li><Link to="/">{t('navbar.discover')}</Link></li>
            <li><Link to="/">{t('navbar.logout')}</Link></li>
          </ul>
        </nav> */}
      </div>
    </>
  );
}
