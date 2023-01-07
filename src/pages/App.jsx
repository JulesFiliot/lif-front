import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchBar from '../components/ui/SearchBar';

function App() {
  const { t } = useTranslation();

  return (
    <div
      className="App"
      style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh',
      }}
    >
      <header className="App-header">
        <SearchBar
          reqUrl="http://openlibrary.org/search.json"
          reqField="title"
          formatData={(data) => data.docs.map((book) => ({ id: book.key, label: book.title }))}
          onChange={(event, newValue) => {
            console.log('fetched data:', newValue);
          }}
        />
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <p>{t('test')}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
