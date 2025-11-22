import React from 'react';
import FeatureCard from './feature-card';
import './how-it-helps.css';
import { type FeatureData } from '../types'; 


const featuresData: FeatureData[] = [
    {
        id: 1,
        icon: 'fas fa-search',
        title: 'Busca Inteligente',
        description: 'Encontre projetos de lei, vereadores e votações com nossa busca avançada e filtros inteligentes.',
    },
    {
        id: 2,
        icon: 'fas fa-robot',
        title: 'Resumos por IA',
        description: 'Nossa inteligência artificial gera resumos claros de projetos complexos para fácil compreensão.',
    },
    {
        id: 3,
        icon: 'fas fa-bell',
        title: 'Acompanhamento',
        description: 'Receba alertas sobre projetos do seu interesse e acompanhe o trabalho dos vereadores.',
    }
];

const HowItHelps: React.FC = () => {
    return (
        <section className="how-it-helps-section">
            <div className="container">
                <h2 className="section-title">Como nossa plataforma ajuda você</h2>
                <div className="features-grid">
                    {featuresData.map(feature => (
                        <FeatureCard key={feature.id} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItHelps;