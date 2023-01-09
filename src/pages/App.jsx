import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Title from '../components/ui/Title';

function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      className="App"
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', height: '90vh',
      }}
    >
      <header className="App-header">
        <Title text="Achievements" />
        <button type="button" onClick={() => navigate('/achievements?page=cat')}>TEST</button>
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
