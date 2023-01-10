import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import Card from './ui/Card';
import achievementPages from '../constants/achievementPages';
import Title from './ui/Title';
import { SET_SUB } from '../core/reducer/app/appActions';
import '../styles/components/subs.scss';
import subAchievementsMenuItems from '../constants/subAchievementsMenuItems';

export default function Subs() {
  const currentCatId = useSelector((state) => state.appReducer.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    // todo fetch cat with cat Id
    const data = {
      papapa: 'Sub 1',
      popopo: 'Sub 2',
      pepepe: 'Sub 3',
    };
    const dataArray = Object.entries(data).map(([key, value]) => ({ [key]: value }));
    setSubs(dataArray);
  }, [currentCatId]);

  return (
    <div className="subs-container">
      <Title text={t('subs.title')} />
      <div className="cards-container">
        {subs.map((c) => {
          const entries = Object.entries(c)[0];
          const key = entries[0];
          const value = entries[1];
          return (
            <Card
              key={key}
              width="300px"
              title={value}
              onClick={() => {
                dispatch({ type: SET_SUB, payload: key });
                navigate(`/achievements?page=${achievementPages.subCategoriesAchievements}&menu=${subAchievementsMenuItems.achievements}`);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
