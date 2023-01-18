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
  const user = useSelector((state) => state.userReducer);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    if (user.id) {
      getUser(user.id).then((data) => {
        setUser(data);

        let userAchievements = [];
        const promises = [];
        if (data.subcat_count) {
          Object.keys(data.subcat_count).forEach((subcatId) => {
            promises.push(getSubsFormCategory(subcatId, user.id)
              .then((ach) => {
                const dataArray = Object.entries(ach).map(([key, value]) => ({
                  id: key,
                  ...value,
                }));
                userAchievements = userAchievements
                  ? userAchievements.concat(dataArray)
                  : dataArray;
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
      }).catch((err) => toast.error(err.message));
    }
  }, [user.id]);

  return (
    <div className="sub-achievements-container">
      <Title
        text={(
          <>
            {`${t('profile.profileOf')}`}
            <span className="title-h1 username">{` ${user.username}`}</span>
          </>
        )}
      />
      <div style={{ margin: '5px 0' }} />
      <UserAchievementsList achievementsDefault={achievements} />
    </div>
  );
}
