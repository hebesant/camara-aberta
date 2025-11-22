
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import PoliticoCard from './politico-card.tsx'; 

import { type PoliticoData } from '../types.tsx'; 
import { fetchPoliticos } from '../../services/api.ts'; 


import './featured-politicos.css';


const LEGISLATURA_ATUAL = "2025-2028"; 
const INITIAL_LOAD_COUNT = 3; 


const FeaturedPoliticos: React.FC = () => {
    
    const [politicos, setPoliticos] = useState<PoliticoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();

    
    const loadPoliticos = async () => {
        try {
            
            
            const data = await fetchPoliticos(LEGISLATURA_ATUAL, ""); 

            
            setPoliticos(data.slice(0, INITIAL_LOAD_COUNT)); 

            if (data.length <= INITIAL_LOAD_COUNT) {
                setHasMore(false);
            }
        } catch (error: any) {
            console.error("Erro ao buscar políticos em destaque:", error.message);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        loadPoliticos(); 
    }, []); 

    
    const handleNavigateToPoliticos = () => {
        navigate('/politicos'); 
    };

    if (loading) {
        return (
            <section className="featured-politicos-section">
                <h2 className="featured-politicos-title">Políticos em Destaque</h2>
                <p>Carregando políticos...</p>
            </section>
        );
    }

    return (
        
        <section className="featured-politicos-section">
            <h2 className="featured-politicos-title">Políticos em Destaque</h2>
            
            <div className="politicos-card-container">
                {politicos.map((politico) => (
                    
                    <PoliticoCard key={politico.id} politico={politico} />
                ))}
            </div>

            <div className="load-more-container">
                {hasMore && (
                    <button
    className="load-more-button"
    onClick={handleNavigateToPoliticos} 
    style={{ marginBottom: '25px' }}
>
    Ver todos os políticos 
</button>

                )}
            </div>
        </section>
    );
};

export default FeaturedPoliticos;