import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from './Button';
import '../../styles/components/ui/burgerMenu.scss';

export default function BurgerMenu({ items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="burder-menu-container">
      <div
        className={`button-container${isOpen ? ' active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.type === 'keydown' && (e.key === 'Enter')) {
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
          {items.map((i) => {
            if (i.action) {
              return (
                <div key={`${i.name}-${i.link}-${i}`}>
                  <Button
                    primary
                    clickAction={() => { setIsOpen(false); i.action(); }}
                    content={i.name}
                  />
                </div>
              );
            }
            return (
              <div key={`${i.name}-${i.link}-${i}`}>
                <Link onClick={() => setIsOpen(false)} to={i.link}>{i.name}</Link>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
BurgerMenu.propTypes = {
  items: PropTypes
    .arrayOf(PropTypes.shape({ name: PropTypes.string, link: PropTypes.string }))
    .isRequired,
};
