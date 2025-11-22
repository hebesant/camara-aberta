import React, { useState, useEffect } from 'react';
import StatItem from './stats-item';
import { type StatData } from '../types';
import './stats.css';

import { supabase } from '../../services/supabaseClient';


const initialStats: StatData[] = [
  { id: 1, value: '...', label: 'Projetos/Votações' },
  { id: 2, value: '...', label: 'Políticos' }, 
];

const StatsSection: React.FC = () => {
  
  const [stats, setStats] = useState<StatData[]>(initialStats);

  
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        
        const { count: projectCount, error: projectError } = await supabase
          .from('votacoes') 
          .select('*', { count: 'exact', head: true }); 

        if (projectError) throw projectError;

        
        const { count: politicoCount, error: politicoError } = await supabase
          .from('politicos_eleitos') 
          .select('*', { count: 'exact', head: true });

        if (politicoError) throw politicoError;

        
        const newStats: StatData[] = [
          {
            id: 1,
            value: (projectCount ?? 0).toString(),
            label: 'Projetos/Votações',
          },
          {
            id: 2,
            value: (politicoCount ?? 0).toString(),
            label: 'Políticos', 
          },
        ];
        setStats(newStats);
      } catch (error: any) {
        
        console.error('Erro ao buscar estatísticas:', error);
        
        setStats([
          { id: 1, value: 'N/A', label: 'Projetos/Votações' },
          { id: 2, value: 'N/A', label: 'Políticos' }, 
        ]);
      }
    };

    fetchCounts();
  }, []); 

  
  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;