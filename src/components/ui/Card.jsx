import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/ui/card.scss';

export default function Card({
  title, leftIcon, rightIcon, hasDropdown, dropdownText, width, onClick, noHover,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      style={width ? { width } : {}}
      className={`card-container${isDropdownOpen ? ' open' : ''}`}
    >
      <div
        className={`card-header${onClick && !noHover ? ' clickable' : ''}`}
        onClick={hasDropdown ? () => {
          setIsDropdownOpen(!isDropdownOpen);
          onClick();
        } : onClick}
        onKeyDown={hasDropdown ? (e) => {
          if (e.type === 'keydown' && (e.key === 'Enter')) {
            setIsDropdownOpen(!isDropdownOpen);
            onClick();
          }
        } : (e) => {
          if (e.type === 'keydown' && (e.key === 'Enter')) {
            onClick();
          }
        }}
        role="button"
        tabIndex={0}
      >
        {leftIcon}
        {title && <span className="title">{title}</span>}
        {rightIcon}
      </div>
      {hasDropdown && (
        <div className="card-dropdown">{dropdownText}</div>
      )}
    </div>
  );
}
Card.propTypes = {
  title: PropTypes.string,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  hasDropdown: PropTypes.bool,
  dropdownText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  width: PropTypes.string,
  onClick: PropTypes.func,
  noHover: PropTypes.bool,
};
Card.defaultProps = {
  title: '',
  leftIcon: null,
  rightIcon: null,
  hasDropdown: false,
  dropdownText: '',
  width: null,
  onClick: () => null,
  noHover: false,
};
