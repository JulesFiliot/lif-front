/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { toast } from 'react-hot-toast';
import HorizontalMenu from './ui/HorizontalMenu';
import achievementPages from '../constants/achievementPages';
import Title from './ui/Title';

import subAchievementsMenuItems from '../constants/subAchievementsMenuItems';
import { getSubsFormCategory } from '../api/achievements';

import '../styles/components/subAchievements.scss';
import '../styles/components/ui/dotMenuBtn.scss';
import '../styles/components/ui/popOver.scss';
import AchievementsList from './AchievementsList';
import Threads from './Threads';

export default function SubAchievements() {
  const currentSub = useSelector((state) => state.appReducer.sub);
  const userId = useSelector((state) => state.userReducer.id);
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
    if (currentSub.id) {
      getSubsFormCategory(currentSub.id, userId)
        .then((data) => {
          const dataArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setAchievements(dataArray);
        })
        .catch((err) => toast.error(err.message));
    }
  }, [currentSub.id]);

  return (
    <div className="sub-achievements-container">
      <Title capitalize text={`${currentSub.name}`} />
      <HorizontalMenu
        activeId={getCurrentMenu()}
        data={horizontalMenuItems}
      />
      <div style={{ margin: '15px 0' }} />
      {currentMenu === subAchievementsMenuItems.achievements && (
        <AchievementsList currentSub={currentSub} achievementsDefault={achievements} />
      )}
      {currentMenu === subAchievementsMenuItems.threads && (
        <Threads currentSub={currentSub} />
      )}
      {currentMenu === subAchievementsMenuItems.validation && ('Building in progress...')}
    </div>
  );
}
