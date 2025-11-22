

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './project-card.tsx';
import { type ProjectData } from '../types.tsx';
import './featured-projects.css';
import { supabase } from '../../services/supabaseClient.ts';

const INITIAL_LOAD_COUNT = 2;

const FeaturedProjects: React.FC = () => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();

    const fetchProjects = async () => {
        try {
            const from = 0;
            const to = INITIAL_LOAD_COUNT - 1;

            const { data, error } = await supabase
                .from('votacoes') 
                .select('id, titulo_documento, assunto_documento, resultado, data_sessao') 
                .order('data_sessao', { ascending: false })
                .range(from, to);

            if (error) throw error;

            if (data) {
                
                const formattedProjects: ProjectData[] = data.map((project) => ({
                    id: project.id,
                    title: project.titulo_documento || 'Título não disponível',
                    summary: project.assunto_documento || 'Assunto não disponível',
                    status: project.resultado || 'Em discussão',
                    date: new Date(project.data_sessao).toLocaleDateString('pt-BR'),
                    tags: ['Legislação Municipal', 'Votação'],
                    authors: [ 
                        {
                            name: 'Autoria diversa',
                            imageUrl: 'https://placehold.co/100x100/EEE/31343C?text=CA',
                        }
                    ],
                }));
             

                setProjects(formattedProjects); 
                if (data.length < INITIAL_LOAD_COUNT) {
                    setHasMore(false);
                }
            }
        } catch (error: any) {
            console.error("Erro ao buscar projetos:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleNavigateToProjects = () => {
        navigate('/projetos');
    };

    if (loading) {
        return (
            <section className="featured-projects-section">
                <h2 className="featured-projects-title">Projetos em Destaque</h2>
                <p>Carregando projetos...</p>
            </section>
        );
    }

    return (
        <section className="featured-projects-section">
            <h2 className="featured-projects-title">Projetos em Destaque</h2>

            <div>
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            <div className="load-more-container">
                {hasMore && (
                    <button
                        className="load-more-button"
                        onClick={handleNavigateToProjects}
                    >
                        Ver todos os projetos
                    </button>
                )}
            </div>
        </section>
    );
};

export default FeaturedProjects;