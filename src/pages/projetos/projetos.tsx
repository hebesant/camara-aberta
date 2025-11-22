

import React, { useState, useEffect, useCallback } from 'react'; 


import { type ProjectData } from '../../components/types.tsx';

import { fetchProjetos as fetchProjetosFromApi } from '../../services/api.ts'; 

import ProjectCard from '../../components/featured-projects/project-card.tsx';
import './projetos.css';
import SEARCH_ICON_SRC from '../../components/icons/search-alt-1-svgrepo-com.svg';


const PAGE_SIZE = 20; 





const Projetos: React.FC = () => {
  const [projetos, setProjetos] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  
  
  
  
  const fetchInitialData = useCallback(async () => {
      setLoading(true);
      setHasMore(true);
      setPage(1); 
      try {
        
        const data = await fetchProjetosFromApi(
          1, 
          activeSearchTerm
        ); 
        setProjetos(data);
        
        if (data.length < PAGE_SIZE) {
          setHasMore(false);
        }
      } catch (error: any) {
        console.error('Erro ao buscar dados iniciais:', error.message);
        setProjetos([]);
      } finally {
        setLoading(false);
      }
    }, [activeSearchTerm]); 

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

  
  
  const fetchMoreProjetos = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;
    
    try {
      
      const data = await fetchProjetosFromApi(
        nextPage, 
        activeSearchTerm
      );

      if (data && data.length > 0) {
        setProjetos((prev) => [...prev, ...data]);
        setPage(nextPage);
        if (data.length < PAGE_SIZE) {
          setHasMore(false);
        }
      } else {
         setHasMore(false);
      }
    } catch (error: any) {
      console.error('Erro ao buscar mais projetos:', error.message);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };


  const handleLoadMore = () => {
    fetchMoreProjetos();
  };

  const handleSearch = () => {
    setActiveSearchTerm(searchTerm);
  };
  
  
  

  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Projetos</h1>
            <p className="hero-subtitle">
              Acompanhe os projetos de lei, resoluções e outras proposições em
              tramitação.
            </p>

            <div className="hero-search">
              <input
                type="text"
                placeholder="Buscar por assunto ou título..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className="search-button" onClick={handleSearch}>
                <img
                  src={SEARCH_ICON_SRC}
                  alt=""
                  className="button-icon"
                />
                Buscar
              </button>
              
              {}
              
            </div>
          </div>
        </div>
      </section>

      <main className="projetos-page-container">
        {loading ? (
          <p>Carregando projetos...</p>
        ) : (
          <>
            {projetos.length === 0 && !loading && (
              <p>
                Nenhum projeto encontrado para "{activeSearchTerm}".
              </p>
            )}
            
            <div className="projetos-grid">
              {projetos.map((project, index) => (
                <ProjectCard key={`${project.id}-${index}`} project={project} />
              ))}
            </div>

            <div className="load-more-container">
              {hasMore && (
                <button
                  className="load-more-button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore
                    ? 'Carregando...'
                    : 'Carregar mais projetos'}
                </button>
              )}
            </div>
          </>
        )}
      </main>
      
     
    </>
  );
};

export default Projetos;