import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/components/ui/button.scss';

export default function Button({
  content, clickAction, style,
  primary, secondary, type,
  disabled, noStylingOnDisabled, empty,
  customClass,
}) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      style={style}
      className={`button-classic${customClass ? ` ${customClass}` : ''}${primary ? ' primary' : ''}${secondary ? ' secondary' : ''}${disabled ? ' disabled' : ''}${noStylingOnDisabled ? ' no-styling-on-disabled' : ''}${empty ? ' empty' : ''}`}
      onClick={clickAction}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
Button.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  clickAction: PropTypes.func,
  style: PropTypes.shape({}),
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  noStylingOnDisabled: PropTypes.bool,
  empty: PropTypes.bool,
  customClass: PropTypes.string,
};
Button.defaultProps = {
  content: '',
  clickAction: () => {},
  style: {},
  primary: false,
  secondary: false,
  type: 'button',
  disabled: false,
  noStylingOnDisabled: false,
  empty: false,
  customClass: '',
};
