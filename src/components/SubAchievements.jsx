import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { t } from 'i18next';
import Card from './ui/Card';
import CrossBtn from './ui/CrossBtn';
import chevronLeft from '../assets/chevron_left.svg';
import HorizontalMenu from './ui/HorizontalMenu';
import achievementPages from '../constants/achievementPages';
import Title from './ui/Title';
import subAchievementsMenuItems from '../constants/subAchievementsMenuItems';
import '../styles/components/subAchievements.scss';

export default function SubAchievements() {
  const currentSubId = useSelector((state) => state.appReducer.sub);
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const currentMenu = urlParams.get('menu');
  const [achievements, setAchievements] = useState([]);
  const horizontalMenuItems = [
    {
      id: 1,
      url_id: subAchievementsMenuItems.achievements,
      label: t('subsAchievements.horizontalMenu.achievements'),
      function: () => navigate(`/achievements?page=${achievementPages.subCategoriesAchievements}&menu=${subAchievementsMenuItems.achievements}`),
    },
    {
      id: 2,
      url_id: subAchievementsMenuItems.threads,
      label: t('subsAchievements.horizontalMenu.threads'),
      function: () => navigate(`/achievements?page=${achievementPages.subCategoriesAchievements}&menu=${subAchievementsMenuItems.threads}`),
    },
    {
      id: 3,
      url_id: subAchievementsMenuItems.validation,
      label: t('subsAchievements.horizontalMenu.validations'),
      function: () => navigate(`/achievements?page=${achievementPages.subCategoriesAchievements}&menu=${subAchievementsMenuItems.validation}`),
    },
  ];

  const getCurrentMenu = () => {
    const menuId = horizontalMenuItems.find((i) => i.url_id === currentMenu)?.id;
    return menuId;
  };

  useEffect(() => {
    // todo fetch achievements with sub Id
    const data = {
      papapa: 'Sub 1',
      popopo: 'Sub 2',
      pepepe: 'Sub 3',
    };
    const dataArray = Object.entries(data).map(([key, value]) => ({ [key]: value }));
    setAchievements(dataArray);
    console.log({ achievements });
  }, [currentSubId]);

  return (
    <div className="sub-achievements-container">
      <Title text={t('subsAchievements.title')} />
      <HorizontalMenu
        activeId={getCurrentMenu()}
        data={horizontalMenuItems}
      />
      <div style={{ margin: '5px 0' }} />
      {currentMenu === subAchievementsMenuItems.achievements && (
      <div className="cards-container">
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
          noHover
          hasDropdown
          dropdownText="Dropdown text very long with a lot of text talking about nothing really interesting. Haha I hope I'll be on a new line or I'll kill myself hehehe xxx"
        />
      </div>
      )}
      {currentMenu === subAchievementsMenuItems.threads && ('TODO Threads here')}
      {currentMenu === subAchievementsMenuItems.validation && ('TODO Validation here')}
    </div>
  );
}
