import React from 'react';
import { useSelector } from 'react-redux';
import Categories from '../components/Categories';
import '../styles/pages/achievements.scss';

export default function Achievements() {
  const state = useSelector((s) => s);
  console.log(state);

  return (
    <div className="achievements-container">
      <Categories />
    </div>
  );
}
