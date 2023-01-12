/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { t } from 'i18next';
import { toast } from 'react-hot-toast';
import Popover from '@mui/material/Popover';
import Card from './ui/Card';
import HorizontalMenu from './ui/HorizontalMenu';
import achievementPages from '../constants/achievementPages';
import SvgBtn from './ui/SvgBtn';
import Title from './ui/Title';
import Loader from './ui/Loader';

import subAchievementsMenuItems from '../constants/subAchievementsMenuItems';
import { claimAchievement, getSubsFormCategory, removeAchievement } from '../services/achievements';
import chevronLeft from '../assets/chevron_left.svg';
import checkIcon from '../assets/check.svg';
import dotMenu from '../assets/dot_menu.svg';
import crossIcon from '../assets/cross.svg';
import binIcon from '../assets/bin.svg';

import '../styles/components/subAchievements.scss';
import '../styles/components/ui/dotMenuBtn.scss';
import '../styles/components/ui/popOver.scss';

export default function SubAchievements() {
  const currentSubId = useSelector((state) => state.appReducer.sub);
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const currentMenu = urlParams.get('menu');
  const [achievements, setAchievements] = useState([]);
  const [loaders, setLoaders] = useState({});
  const [actionPopoverData, setActionPopoverData] = useState(
    { open: false, anchorEl: null, achievement: {} },
  );
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

  const addAchievement = (achievementToAdd) => {
    setActionPopoverData({ anchorEl: null, open: false });
    setLoaders({ ...loaders, [achievementToAdd?.id]: true });
    claimAchievement({
      user_achievement: {
        user_id: '1',
        achievement_id: achievementToAdd?.id,
      },
    })
      .then((data) => {
        // todo check that it works with data (data.data ?)
        const index = achievements
          .findIndex((el) => el.id === achievementToAdd?.id);
        if (index) {
          const newAchievements = [...achievements];
          newAchievements[index] = data;
          setAchievements(newAchievements);
        }
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoaders({ ...loaders, [achievementToAdd?.id]: false }));
  };

  const deleteAchievement = (achievementToDelete) => {
    setActionPopoverData({ anchorEl: null, open: false });
    setLoaders({ ...loaders, [achievementToDelete?.id]: true });
    removeAchievement({
      user_achievement: {
        user_id: '1',
        user_achievement_id: achievementToDelete.user_achievement_id,
        subcat_id: currentSubId,
      },
    })
      .then(() => {
        const index = achievements
          .findIndex((el) => el.id === achievementToDelete?.id);
        if (index) {
          const newAchievements = [...achievements];
          newAchievements[index].user_achievement_id = null;
          setAchievements(newAchievements);
        }
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoaders({ ...loaders, [achievementToDelete?.id]: false }));
  };

  const actionPopover = () => {
    const currentAchievement = actionPopoverData.achievement;
    return (
      <Popover
        className="popover-container"
        open={actionPopoverData.open}
        anchorEl={actionPopoverData.anchorEl}
        onClose={() => setActionPopoverData({ anchorEl: null, open: false, achievement: {} })}
        onClick={(e) => e.stopPropagation()}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <div className="actions-container">
          {!currentAchievement?.user_achievement_id ? (
            <>
              <div className="action-item">
                <button
                  type="button"
                  className="primary"
                  onClick={() => addAchievement(currentAchievement)}
                >
                  {t('subsAchievements.actionsMenu.quickAdd')}
                  <SVG src={crossIcon} className="cross-icon primary" />
                </button>
              </div>
              <div className="action-item">
                <button type="button">
                  {t('subsAchievements.actionsMenu.add')}
                  <SVG src={crossIcon} className="cross-icon" />
                </button>
              </div>
            </>
          ) : (
            <div className="action-item">
              <button
                type="button"
                onClick={() => deleteAchievement(currentAchievement)}
              >
                {t('subsAchievements.actionsMenu.remove')}
                <SVG src={binIcon} className="bin-icon" />
              </button>
            </div>
          )}
        </div>
      </Popover>
    );
  };

  useEffect(() => {
    // todo add real user id
    if (currentSubId) {
      getSubsFormCategory(currentSubId, 1)
        .then((data) => {
          const dataArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setAchievements(dataArray);
          setLoaders(dataArray.reduce((acc, v) => ({ ...acc, [v.id]: false }), {}));
        })
        .catch((err) => toast.error(err.message));
    }
  }, [currentSubId]);

  return (
    <div className="sub-achievements-container">
      <Title text={t('subsAchievements.title')} />
      <HorizontalMenu
        activeId={getCurrentMenu()}
        data={horizontalMenuItems}
      />
      <div style={{ margin: '15px 0' }} />
      {currentMenu === subAchievementsMenuItems.achievements && (
      <div className="cards-container">
        {achievements.map((a) => (
          <Card
            key={a.id}
            title={a.name}
            leftIcon={<SVG src={chevronLeft} className="chevron-down" alt="chevron left" />}
            rightIcon={!loaders[a.id] ? (
              <>
                {a.user_achievement_id && <SVG src={checkIcon} className="check-icon" alt="check icon" />}
                {
                  actionPopoverData.achievement.id === a.id
                  && actionPopoverData.open
                  && actionPopover()
                }
                <SvgBtn
                  svgSource={dotMenu}
                  customClass="dot-menu-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActionPopoverData({ anchorEl: e.currentTarget, open: true, achievement: a });
                  }}
                />
              </>
            ) : <Loader />}
            noHover
            hasDropdown
            dropdownText={`${a.name}: ${a.desc}`}
          />
        ))}
      </div>
      )}
      {currentMenu === subAchievementsMenuItems.threads && ('TODO Threads here')}
      {currentMenu === subAchievementsMenuItems.validation && ('TODO Validation here')}
    </div>
  );
}
