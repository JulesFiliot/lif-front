import React, { useState, useEffect } from 'react';
import { t } from 'i18next';
import { toast } from 'react-hot-toast';
import Popover from '@mui/material/Popover';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import Card from './ui/Card';
import Loader from './ui/Loader';
import SvgBtn from './ui/SvgBtn';

import { claimAchievement, removeAchievement } from '../api/achievements';
import chevronLeft from '../assets/chevron_left.svg';
import checkIcon from '../assets/check.svg';
import dotMenu from '../assets/dot_menu.svg';
import crossIcon from '../assets/cross.svg';
import binIcon from '../assets/bin.svg';

import '../styles/components/achievementsList.scss';
import '../styles/components/ui/dotMenuBtn.scss';
import '../styles/components/ui/popOver.scss';

export default function AchievementsList({ achievementsDefault, currentSubId }) {
  const [achievements, setAchievements] = useState([]);
  const [loaders, setLoaders] = useState({});
  const [actionPopoverData, setActionPopoverData] = useState(
    { open: false, anchorEl: null, achievement: {} },
  );

  const addAchievement = (achievementToAdd) => {
    setActionPopoverData({ anchorEl: null, open: false, achievement: {} });
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
        if (index + 1) {
          const newAchievements = [...achievements];
          newAchievements[index] = data;
          setAchievements(newAchievements);
        }
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoaders({ ...loaders, [achievementToAdd?.id]: false }));
  };

  const deleteAchievement = (achievementToDelete) => {
    setActionPopoverData({ anchorEl: null, open: false, achievement: {} });
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
        console.log({ index }, achievementToDelete);
        if (index + 1) {
          const newAchievements = [...achievements];
          delete newAchievements[index].user_achievement_id;
          console.log('the new achievements', newAchievements);
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
    const dataArray = Object.entries(achievementsDefault).map(([key, value]) => ({
      id: key,
      ...value,
    }));
    setAchievements(dataArray);
    setLoaders(dataArray.reduce((acc, v) => ({ ...acc, [v.id]: false }), {}));
  }, [achievementsDefault]);

  useEffect(() => {
    console.log({ achievements });
  }, [achievements]);
  useEffect(() => {
    console.log({ actionPopoverData });
  }, [actionPopoverData]);

  return (
    <div className="achievements-list-container">
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
                  actionPopoverData?.achievement?.id === a.id
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
    </div>
  );
}
AchievementsList.propTypes = {
  achievementsDefault: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentSubId: PropTypes.string.isRequired,
};
