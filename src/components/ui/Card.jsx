import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/ui/card.scss';

export default function Card({
  title, leftIcon, rightIcon,
  hasDropdown, dropdownContent,
  width, onClick, noHover,
  alwaysOpen, customClass,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      style={width ? { width } : {}}
      className={`card-container${customClass ? ` ${customClass}` : ''}${isDropdownOpen || (hasDropdown && alwaysOpen) ? ' open' : ''}`}
    >
      <div
        className={`card-header${onClick && !noHover ? ' clickable' : ''}`}
        onClick={hasDropdown && !alwaysOpen ? () => {
          setIsDropdownOpen(!isDropdownOpen);
          onClick();
        } : onClick}
        onKeyDown={hasDropdown && !alwaysOpen ? (e) => {
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
        {(title && typeof title === typeof 'string')
          ? <span className="title">{title}</span> : title}
        {rightIcon}
      </div>
      {hasDropdown && (
        <div className="card-dropdown">{dropdownContent}</div>
      )}
    </div>
  );
}
Card.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  hasDropdown: PropTypes.bool,
  dropdownContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  width: PropTypes.string,
  onClick: PropTypes.func,
  noHover: PropTypes.bool,
  alwaysOpen: PropTypes.bool,
  customClass: PropTypes.string,
};
Card.defaultProps = {
  title: '',
  leftIcon: null,
  rightIcon: null,
  hasDropdown: false,
  dropdownContent: '',
  width: null,
  onClick: () => null,
  noHover: false,
  alwaysOpen: false,
  customClass: '',
};
