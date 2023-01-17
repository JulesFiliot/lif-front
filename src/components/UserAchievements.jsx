/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { t } from 'i18next';
import { toast } from 'react-hot-toast';
import Title from './ui/Title';

import { getSubsFormCategory } from '../api/achievements';
import { getUser } from '../api/users';

import '../styles/components/subAchievements.scss';
import '../styles/components/ui/dotMenuBtn.scss';
import '../styles/components/ui/popOver.scss';
import UserAchievementsList from './UserAchievementsList';
import { setUser } from '../core/reducer/user/userActions';

export default function UserAchievements() {
  const userId = useSelector((state) => state.userReducer.id);
  const [achievements, setAchievements] = useState([]);
  const user = useSelector((state) => state.userReducer);
  getUser(userId).then((data) => {
    setUser(data);
  });
  useEffect(() => {
    if (userId) {
      let userAchievements = [];
      const promises = [];
      if (user.subcat_count) {
        Object.keys(user.subcat_count).forEach((subcatId) => {
          promises.push(getSubsFormCategory(subcatId, userId)
            .then((data) => {
              const dataArray = Object.entries(data).map(([key, value]) => ({
                id: key,
                ...value,
              }));
              userAchievements = userAchievements ? userAchievements.concat(dataArray) : dataArray;
              return dataArray;
            })
            .catch((err) => toast.error(err.message)));
        });
        Promise.all(promises).then(() => {
          Object.keys(userAchievements).forEach((item) => {
            if (!userAchievements[item].user_achievement_id) {
              delete userAchievements[item];
            }
          });
          setAchievements(userAchievements);
        });
      }
    }
  }, [userId]);

  return (
    <div className="sub-achievements-container">
      <Title text={t('profile.title')} />

      <div style={{ margin: '15px 0' }} />

      <UserAchievementsList currentSubId={null} achievementsDefault={achievements} />
    </div>
  );
}
