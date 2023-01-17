import React from 'react';
import '../styles/pages/achievements.scss';
import UserAchievements from '../components/UserAchievements';

export default function Achievements() {
  return (
    <div className="achievements-container">
      <UserAchievements />
    </div>
  );
}
