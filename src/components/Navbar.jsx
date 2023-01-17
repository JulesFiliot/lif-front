import React from 'react';
import { t } from 'i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SvgBtn from './ui/SvgBtn';
import BurgerMenu from './ui/BurgerMenu';
import SearchBar from './ui/SearchBar';
import Button from './ui/Button';
import achievementPages from '../constants/achievementPages';
import subAchievementsMenuItems from '../constants/subAchievementsMenuItems';
import chevronLeft from '../assets/chevron_left.svg';
import lifLogo from '../assets/lif_logo.png';
import '../styles/components/navbar.scss';
import '../styles/components/ui/backBtn.scss';
import { logout } from '../core/reducer/user/userActions';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const currentPath = location.pathname;
  const achievementPage = urlParams.get('page');
  const subAchievementsMenu = urlParams.get('menu');
  const navItems = [
    { name: t('navbar.profile'), link: '/profile' },
    { name: t('navbar.achievements'), link: `/achievements?page=${achievementPages.categories}` },
    { name: t('navbar.discover'), link: '/discover' },
    { name: t('navbar.logout'), action: () => dispatch(logout()) },
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
      <SvgBtn
        svgSource={chevronLeft}
        customClass="back-button"
        onClick={() => {
          if (achievementPage === achievementPages.subCategoriesAchievements) {
            navigate(`/achievements?page=${achievementPages.subCategories}`);
          } else if (achievementPage === achievementPages.subCategories) {
            navigate(`/achievements?page=${achievementPages.categories}`);
          } else {
            navigate(-1);
          }
        }}
      />
      <div className="desktop-menu">
        {navItems.map((item) => {
          if (item.action) {
            return (
              <div key={`${item.name}-${item.link}`} className="nav-item">
                <Button empty primary clickAction={item.action} content={item.name} />
              </div>
            );
          }
          return (
            <div key={`${item.name}-${item.link}`} className="nav-item">
              <Link to={item.link}>{item.name}</Link>
            </div>
          );
        })}
      </div>
      {/* //todo re-enable search bar when it works with achievements filtering */}
      {hasSearchBar() && false && (
        <SearchBar
          reqUrl="http://openlibrary.org/search.json"
          reqField="title"
          formatData={(data) => data.docs.map((book) => ({ id: book.key, label: book.title }))}
          onChange={(event, newValue) => {
            console.log('fetched data:', newValue);
          }}
        />
      )}
      <img src={lifLogo} alt="LIF Logo" className={`logo${(hasSearchBar() && false) ? ' hide' : ''}`} />
      <BurgerMenu items={navItems} />
    </div>
  );
}
