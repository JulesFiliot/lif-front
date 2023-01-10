import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { toast } from 'react-hot-toast';
import Card from './ui/Card';
import achievementPages from '../constants/achievementPages';
import Title from './ui/Title';
import { SET_CATEGORY } from '../core/reducer/app/appActions';
import { getCategories } from '../services/categories';
import '../styles/components/categories.scss';

export default function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((data) => {
        const dataArray = Object.entries(data).map(([key, value]) => ({ [key]: value }));
        setCategories(dataArray);
      })
      .catch((err) => toast.error(err.message));
  }, []);

  return (
    <div className="categories-container">
      <Title text={t('categories.title')} />
      <div className="cards-container">
        {categories.map((c) => {
          const entries = Object.entries(c)[0];
          const key = entries[0];
          const value = entries[1];
          return (
            <Card
              key={key}
              width="300px"
              title={value}
              onClick={() => {
                dispatch({ type: SET_CATEGORY, payload: key });
                navigate(`/achievements?page=${achievementPages.subCategories}`);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
