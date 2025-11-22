
import React, { useState, useEffect } from "react";



import { type PoliticoData } from "../../components/types.tsx";

import { fetchPoliticos } from "../../services/api.ts";

import PoliticoCard from "../../components/politico-card/politico-card.tsx";
import "./politicos.css";
import SEARCH_ICON_SRC from "../../components/icons/search-alt-1-svgrepo-com.svg";


const LEGISLATURA_PADRAO = "2025-2028";
const INITIAL_LOAD_COUNT = 8;
const LOAD_MORE_COUNT = 4;

const Politicos: React.FC = () => {
  const [todosPoliticos, setTodosPoliticos] = useState<PoliticoData[]>([]);
  const [politicosExibidos, setPoliticosExibidos] = useState<PoliticoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");

  const loadPoliticos = async (isInitialLoad: boolean) => {
    if (isInitialLoad) {
      setLoading(true);
    }

    const data = await fetchPoliticos(LEGISLATURA_PADRAO, activeSearchTerm);

    setTodosPoliticos(data);
    setPoliticosExibidos(data.slice(0, INITIAL_LOAD_COUNT));
    setHasMore(data.length > INITIAL_LOAD_COUNT);
    setLoading(false);
  };

  useEffect(() => {
    loadPoliticos(true);
  }, [activeSearchTerm]);

  const handleLoadMore = () => {
    const currentLength = politicosExibidos.length;
    const nextBatch = todosPoliticos.slice(
      currentLength,
      currentLength + LOAD_MORE_COUNT
    );
    setPoliticosExibidos((prev) => [...prev, ...nextBatch]);
    if (politicosExibidos.length + nextBatch.length >= todosPoliticos.length) {
      setHasMore(false);
    }
  };

  const handleSearch = () => {
    setActiveSearchTerm(searchTerm);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Políticos</h1>
            <p className="hero-subtitle">
              Conheça os representantes eleitos e acompanhe seus trabalhos.
            </p>

            <div className="hero-search">
              <input
                type="text"
                placeholder="Buscar político ou nome..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button className="search-button" onClick={handleSearch}>
                <img
                  src={SEARCH_ICON_SRC}
                  alt=""
                  className="button-icon"
                />
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="politicos-page-container">
        {loading ? (
          <p>Carregando políticos...</p>
        ) : (
          <>
            <div className="politicos-grid">
              {politicosExibidos.length === 0 && !loading && (
                <p>Nenhum político encontrado para "{activeSearchTerm}".</p>
              )}

              {politicosExibidos.map((politico) => (
                <PoliticoCard key={politico.id} politico={politico} />
              ))}
            </div>

            <div className="load-more-container">
              {hasMore && (
                <button
                  className="load-more-button"
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {"Carregar mais políticos"}
                </button>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Politicos;