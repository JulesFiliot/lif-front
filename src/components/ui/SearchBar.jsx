/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import SVG from 'react-inlinesvg';
import { t } from 'i18next';
import searchIcon from '../../assets/search_icon.svg';
import '../../styles/components/ui/searchBar.scss';

const options = ['Option 1', 'Option 2'];

export default function SearchBar() {
  return (
    <Autocomplete
      className="search-bar"
      options={options}
      renderInput={(params) => (
        <div className="search-input" ref={params.InputProps.ref}>
          <input type="text" placeholder={t('searchBar.placeholder')} {...params.inputProps} />
          <div className="icon-container">
            <SVG src={searchIcon} alt="search icon" className="search-icon" />
          </div>
        </div>
      )}
    />
  );
}
