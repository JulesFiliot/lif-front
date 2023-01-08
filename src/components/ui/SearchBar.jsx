/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useMemo } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import Autocomplete from '@mui/material/Autocomplete';
import SVG from 'react-inlinesvg';
import { t } from 'i18next';
import searchIcon from '../../assets/search_icon.svg';
import '../../styles/components/ui/searchBar.scss';

export default function SearchBar({
  reqUrl, placeholder, icon, reqField, formatData, onChange, width,
}) {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = (event, inputValue) => {
    if (inputValue) {
      setIsLoading(true);
      setOptions([]);
      axios.get(`${reqUrl}?${reqField}=${inputValue}`)
        .then((res) => {
          const { data } = res;
          setOptions(formatData(data));
        })
        .finally(() => setIsLoading(false));
    }
  };

  const onInputChange = useMemo(() => debounce(fetchData, 500), []);

  return (
    <Autocomplete
      className="search-bar"
      filterOptions={(x) => x} // disable filtering on client side
      options={options}
      freeSolo
      loading={isLoading}
      loadingText={<span style={{ color: '#60677c' }}>{t('searchBar.loading')}</span>}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onInputChange={(event, newInputValue) => onInputChange(event, newInputValue)}
      onChange={(event, newValue) => onChange(event, newValue)}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <div style={width ? { width } : {}} className="search-input" ref={params.InputProps.ref}>
          <input type="text" placeholder={placeholder || t('searchBar.placeholder')} {...params.inputProps} />
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
  width: PropTypes.string,
};
SearchBar.defaultProps = {
  placeholder: t('searchBar.placeholder'),
  icon: <SVG src={searchIcon} alt="search icon" className="search-icon" />,
  width: null,
};
