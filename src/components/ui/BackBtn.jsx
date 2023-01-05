import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import chevronLeft from '../../assets/chevron_left.svg';
import '../../styles/components/ui/backBtn.scss';

export default function BackBtn({ onClick }) {
  return (
    <button type="button" className="back-button" onClick={onClick}>
      <SVG src={chevronLeft} alt="chevron left" />
    </button>
  );
}

BackBtn.propTypes = {
  onClick: PropTypes.func,
};
BackBtn.defaultProps = {
  onClick: null,
};
