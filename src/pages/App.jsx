import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import Card from '../components/ui/Card';
import Title from '../components/ui/Title';
import chevronLeft from '../assets/chevron_left.svg';

function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      className="App"
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', height: '90vh', overflow: 'auto',
      }}
    >
      <Title text="Achievements" />
      <Card
        title="Title test"
        rightIcon={<SVG src={chevronLeft} className="chevron-down" alt="chevron left" />}
        hasDropdown
        dropdownText="Dropdown text"
      />
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
    </div>
  );
}

export default App;
