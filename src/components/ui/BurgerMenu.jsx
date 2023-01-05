import React from 'react';

export default function BurgerMenu() {
  return (
    <>
      <div className="button-container" id="toggle">
        <span className="top" />
        <span className="middle" />
        <span className="bottom" />
      </div>
      <div className="overlay" id="overlay">
        <nav className="overlay-menu">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Work</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
    </>
  );
}
