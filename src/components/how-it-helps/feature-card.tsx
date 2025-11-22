import React from 'react';
import { type FeatureData } from '../types'; 

interface FeatureCardProps {
    feature: FeatureData;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
    return (
        <div className="feature-card">
            <div className="icon-container">
                <i className={feature.icon}></i>
            </div>
            <h3 className="feature-card-title">{feature.title}</h3>
            <p className="feature-card-description">{feature.description}</p>
        </div>
    );
};

export default FeatureCard;