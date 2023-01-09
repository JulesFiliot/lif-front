import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/ui/horizontalMenu.scss';

export default function HorizontalMenu({ data, activeId }) {
  return (
    <div className="horizontal-menu-container">
      {data.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={item.function}
          className={activeId === item.id ? 'active' : ''}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
HorizontalMenu.propTypes = {
  data: PropTypes
    .arrayOf(PropTypes.shape({ label: PropTypes.string, function: PropTypes.func }))
    .isRequired,
  activeId: PropTypes.number,
};
HorizontalMenu.defaultProps = {
  activeId: null,
};
