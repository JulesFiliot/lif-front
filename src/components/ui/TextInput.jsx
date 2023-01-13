import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../../styles/components/ui/textInput.scss';

export default function TextInput({
  value, placeholder, onChange, style, type, error,
}) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    if (!value) {
      setInputValue(event.target.value);
    }
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="text-input-container">
      <input
        style={style}
        className="text-input"
        type={type}
        value={value || inputValue}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
TextInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.shape({}),
  type: PropTypes.string,
  error: PropTypes.string,
};
TextInput.defaultProps = {
  value: '',
  placeholder: '',
  onChange: () => {},
  style: {},
  type: 'text',
  error: '',
};
