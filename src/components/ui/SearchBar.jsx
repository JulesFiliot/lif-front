/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import Autocomplete from '@mui/material/Autocomplete';
import SVG from 'react-inlinesvg';
import { t } from 'i18next';
import searchIcon from '../../assets/search_icon.svg';
import '../../styles/components/ui/searchBar.scss';

export default function SearchBar({
  reqUrl, placeholder, icon, reqField, formatData, onChange,
}) {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const fetchData = (event, inputValue) => {
    if (inputValue) {
      fetch(`${reqUrl}?${reqField}=${inputValue}`)
        .then((response) => response.json())
        .then((data) => {
          setOptions(formatData(data));
        });
    }
  };

  const onInputChange = useMemo(
    () => debounce(fetchData, 300),
    [],
  );

  // todo warning when changing input value with a selected value
  return (
    <Autocomplete
      className="search-bar"
      filterOptions={(x) => x} // disable filtering on client side
      options={options}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={
        (option) => (selectedValue ? option.id === selectedValue.id : false)
      }
      onInputChange={(event, newInputValue) => onInputChange(event, newInputValue)}
      onChange={(event, newValue) => { setSelectedValue(newValue); onChange(event, newValue); }}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <div className="search-input" ref={params.InputProps.ref}>
          <input type="text" placeholder={placeholder} {...params.inputProps} />
          <div className="icon-container">
            {icon}
          </div>
        </div>
      )}
    />
  );
}
SearchBar.propTypes = {
  placeholder: PropTypes.string,
  icon: PropTypes.element,
  reqUrl: PropTypes.string.isRequired,
  reqField: PropTypes.string.isRequired,
  formatData: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
SearchBar.defaultProps = {
  placeholder: t('searchBar.placeholder'),
  icon: <SVG src={searchIcon} alt="search icon" className="search-icon" />,
};
