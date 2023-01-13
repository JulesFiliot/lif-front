import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/ui/Title.scss';

export default function Title({ text, primary, secondary }) {
  return (
    <div className={`title-container${primary ? ' primary' : ''}${secondary ? ' secondary' : ''}`}>
      <h1
        className="title-h1"
      >
        {text}
      </h1>
      {/* <div className="underline" /> */}
    </div>
  );
}
Title.propTypes = {
  text: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
};
Title.defaultProps = {
  primary: false,
  secondary: false,
};
