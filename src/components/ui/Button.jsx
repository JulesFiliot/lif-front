import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/components/ui/button.scss';

export default function Button({
  text, clickAction, style, primary, secondary,
}) {
  return (
    <button
      type="button"
      style={style}
      className={`button-classic${primary ? ' primary' : ''}${secondary ? ' secondary' : ''}`}
      onClick={clickAction}
    >
      {text}
    </button>
  );
}
Button.propTypes = {
  text: PropTypes.string,
  clickAction: PropTypes.func,
  style: PropTypes.shape({}),
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
};
Button.defaultProps = {
  text: '',
  clickAction: () => {},
  style: {},
  primary: false,
  secondary: false,
};
