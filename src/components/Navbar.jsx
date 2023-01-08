import React from 'react';
import { t } from 'i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BackBtn from './ui/BackBtn';
import BurgerMenu from './ui/BurgerMenu';
import SearchBar from './ui/SearchBar';
import achievementPages from '../constants/achievementPages';
import subAchievementsMenuItems from '../constants/subAchievementsMenuItems';
import lifLogo from '../assets/lif_logo.png';
import '../styles/components/navbar.scss';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const currentPath = location.pathname;
  const achievementPage = urlParams.get('page');
  const subAchievementsMenu = urlParams.get('menu');
  const navItems = [
    { name: t('navbar.profile'), link: '/profile' },
    { name: t('navbar.achievements'), link: `/achievements?page=${achievementPages.categories}` },
    { name: t('navbar.discover'), link: '/achievements?page=subAchievements&menu=achievements' },
    { name: t('navbar.logout'), link: '/achievements?page=yo' },
  ];

  const hasSearchBar = () => {
    if (currentPath === '/achievements') {
      if (
        achievementPage === achievementPages.categories
        || achievementPage === achievementPages.subCategories
      ) {
        return true;
      }
      if (
        achievementPage === achievementPages.subCategoriesAchievements
        && subAchievementsMenu === subAchievementsMenuItems.achievements
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="navbar-container">
      <BackBtn onClick={() => navigate(-1)} />
      <div className="desktop-menu">
        {navItems.map((item) => (
          <div key={`${item.name}-${item.link}`} className="nav-item"><Link to={item.link}>{item.name}</Link></div>
        ))}
      </div>
      {hasSearchBar() && (
        <SearchBar
          reqUrl="http://openlibrary.org/search.json"
          reqField="title"
          formatData={(data) => data.docs.map((book) => ({ id: book.key, label: book.title }))}
          onChange={(event, newValue) => {
            console.log('fetched data:', newValue);
          }}
        />
      )}
      <img src={lifLogo} alt="LIF Logo" className={`logo${hasSearchBar() ? ' hide' : ''}`} />
      <BurgerMenu items={navItems} />
    </div>
  );
}
