import React from 'react';
import { type StatData } from '../types'; 

interface StatItemProps {
  stat: StatData;
}

const StatItem: React.FC<StatItemProps> = ({ stat }) => {
  return (
    <div className="stat-item">
      <div className="stat-number">{stat.value}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
};

export default StatItem;