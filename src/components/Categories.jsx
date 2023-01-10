import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import Card from './ui/Card';
import achievementPages from '../constants/achievementPages';
import Title from './ui/Title';
import '../styles/components/categories.scss';

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const data = {
      lalala: 'Category 1',
      lololo: 'Category 2',
      hehehe: 'Category 3',
    };
    const dataArray = Object.entries(data).map(([key, value]) => ({ [key]: value }));
    setCategories(dataArray);
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
              onClick={() => navigate(`/achievements?page=${achievementPages.subCategories}&id=${key}`)}
            />
          );
        })}
      </div>
    </div>
  );
}
