import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { t } from 'i18next';
import { toast } from 'react-hot-toast';
import Popover from '@mui/material/Popover';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import Card from './ui/Card';
import Loader from './ui/Loader';

import { removeAchievement } from '../api/achievements';
import chevronLeft from '../assets/chevron_left.svg';
import checkIcon from '../assets/check.svg';
import binIcon from '../assets/bin.svg';

import '../styles/components/achievementsList.scss';
import '../styles/components/ui/dotMenuBtn.scss';
import '../styles/components/ui/popOver.scss';

export default function UserAchievementsList({ achievementsDefault }) {
  const userId = useSelector((state) => state.userReducer.id);
  const [achievements, setAchievements] = useState([]);
  const [loaders, setLoaders] = useState({});
  const [actionPopoverData, setActionPopoverData] = useState(
    { open: false, anchorEl: null, achievement: {} },
  );

  const deleteAchievement = (achievementToDelete) => {
    setActionPopoverData({ anchorEl: null, open: false, achievement: {} });
    setLoaders({ ...loaders, [achievementToDelete?.id]: true });
    removeAchievement({
      user_achievement: {
        user_id: userId,
        user_achievement_id: achievementToDelete.user_achievement_id,
        subcat_id: null,
      },
    })
      .then(() => {
        const index = achievements
          .findIndex((el) => el.id === achievementToDelete?.id);
        if (index + 1) {
          const newAchievements = [...achievements];
          delete newAchievements[index].user_achievement_id;
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
          {!currentAchievement?.(
            <div className="action-item">
              <button
                type="button"
                onClick={() => deleteAchievement(currentAchievement)}
              >
                {t('subsAchievements.actionsMenu.remove')}
                <SVG src={binIcon} className="bin-icon" />
              </button>
            </div>,
          )}
        </div>
      </Popover>
    );
  };

  useEffect(() => {
    if (achievementsDefault || achievementsDefault?.length === 0) {
      setAchievements(achievementsDefault);
      setLoaders(achievementsDefault.reduce((acc, v) => ({ ...acc, [v.id]: false }), {}));
    }
  }, [achievementsDefault]);

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

              </>
            ) : <Loader />}
            noHover
            hasDropdown
            dropdownContent={(
              <div className="achievement-description">
                <div>{`${a.name}: ${a.desc}`}</div>
                <div className="rank-container">
                  {`${t('subsAchievements.rank')}: ${a.rank.charAt(0).toUpperCase() + a.rank.slice(1)}`}
                </div>
              </div>
)}
          />
        ))}
      </div>
    </div>
  );
}
UserAchievementsList.propTypes = {
  achievementsDefault: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
