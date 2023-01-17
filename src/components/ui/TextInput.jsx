import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../../styles/components/ui/textInput.scss';

export default function TextInput({
  value, placeholder, onChange, style, type, error, disabled,
}) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    if (value === '') {
      setInputValue('');
    } else if (!value) {
      setInputValue(event.target.value);
    }
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div style={style} className="text-input-container">
      {type !== 'textarea' ? (
        <input
          className={`text-input${disabled ? ' disabled' : ''}`}
          type={type}
          value={value || inputValue}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
        />
      ) : (
        <textarea
          className={`text-input${disabled ? ' disabled' : ''}`}
          value={value || inputValue}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
        />
      )}
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
  disabled: PropTypes.bool,
};
TextInput.defaultProps = {
  value: '',
  placeholder: '',
  onChange: () => {},
  style: {},
  type: 'text',
  error: '',
  disabled: false,
};
