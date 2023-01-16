import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import '../../styles/components/ui/svgBtn.scss';

export default function SvgBtn({
  onClick, svgSource, customClass, disabled,
}) {
  return (
    <button
      type="button"
      className={`svg-button${customClass ? ` ${customClass}` : ''}${disabled ? ' disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <SVG src={svgSource} alt="icon" />
    </button>
  );
}

SvgBtn.propTypes = {
  onClick: PropTypes.func,
  svgSource: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  disabled: PropTypes.bool,
};
SvgBtn.defaultProps = {
  onClick: null,
  customClass: null,
  disabled: false,
};
