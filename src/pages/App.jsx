import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import Card from '../components/ui/Card';
import Title from '../components/ui/Title';
import chevronLeft from '../assets/chevron_left.svg';
import CrossBtn from '../components/ui/CrossBtn';

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
        title="Solar Master: Build a solar panel"
        onClick={() => console.log('NICE')}
        leftIcon={<SVG src={chevronLeft} className="chevron-down" alt="chevron left" />}
        rightIcon={(
          <CrossBtn onClick={(e) => {
            e.stopPropagation();
            console.log('HEHEHE');
          }}
          />
        )}
        hasDropdown
        dropdownText="Dropdown text very long with a lot of text talking about nothing really interesting. Haha I hope I'll be on a new line or I'll kill myself hehehe xxx"
      />
      <br />
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
