import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import cross from '../../assets/cross.svg';
import '../../styles/components/ui/crossBtn.scss';

export default function CrossBtn({ onClick }) {
  return (
    <button type="button" className="cross-button" onClick={onClick}>
      <SVG src={cross} alt="cross icon" />
    </button>
  );
}

CrossBtn.propTypes = {
  onClick: PropTypes.func,
};
CrossBtn.defaultProps = {
  onClick: null,
};
