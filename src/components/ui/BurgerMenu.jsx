import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../styles/components/ui/burgerMenu.scss';

export default function BurgerMenu({ items }) {
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
          {items.map((i) => (
            <div key={`${i.name}-${i.link}-${i}`}><Link to={i.link}>{i.name}</Link></div>
          ))}
        </nav>
      </div>
    </>
  );
}
BurgerMenu.propTypes = {
  items: PropTypes
    .arrayOf(PropTypes.shape({ name: PropTypes.string, link: PropTypes.string }))
    .isRequired,
};
