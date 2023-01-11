import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import '../../styles/components/ui/svgBtn.scss';

export default function SvgBtn({ onClick, svgSource, customClass }) {
  return (
    <button
      type="button"
      className={`svg-button${customClass ? ` ${customClass}` : ''}`}
      onClick={onClick}
    >
      <SVG src={svgSource} alt="cross icon" />
    </button>
  );
}

SvgBtn.propTypes = {
  onClick: PropTypes.func,
  svgSource: PropTypes.string.isRequired,
  customClass: PropTypes.string,
};
SvgBtn.defaultProps = {
  onClick: null,
  customClass: null,
};
