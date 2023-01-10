import React from 'react';
import { useLocation } from 'react-router-dom';
import Categories from '../components/Categories';
import SubAchievements from '../components/SubAchievements';
import Subs from '../components/Subs';
import achievementPages from '../constants/achievementPages';
import '../styles/pages/achievements.scss';

export default function Achievements() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const currentPage = urlParams.get('page');

  return (
    <div className="achievements-container">
      {currentPage === achievementPages.categories && <Categories />}
      {currentPage === achievementPages.subCategories && <Subs />}
      {currentPage === achievementPages.subCategoriesAchievements && <SubAchievements />}
    </div>
  );
}
