import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/ui/card.scss';

export default function Card({
  title, leftIcon, rightIcon, hasDropdown, dropdownText,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={`card-container${isDropdownOpen ? ' open' : ''}`}>
      <div
        className="card-header"
        onClick={hasDropdown ? () => setIsDropdownOpen(!isDropdownOpen) : null}
        onKeyDown={hasDropdown ? (e) => {
          if (e.type === 'keydown' && (e.key === 'Enter')) {
            setIsDropdownOpen(!isDropdownOpen);
          }
        } : null}
        role="button"
        tabIndex={0}
      >
        {leftIcon}
        {title}
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
  dropdownText: PropTypes.string,
};
Card.defaultProps = {
  title: '',
  leftIcon: null,
  rightIcon: null,
  hasDropdown: false,
  dropdownText: '',
};
