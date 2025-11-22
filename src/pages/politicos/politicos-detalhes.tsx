
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./politicos-detalhes.css";

import {
  type PoliticoDetalhesData,
} from "../../components/types.tsx"; 
import {
  fetchPoliticoDetalhes,
} from "../../services/api.ts"; 

const PoliticoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [politico, setPolitico] = useState<PoliticoDetalhesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPolitico = async () => {
      if (!id) return;
      try {
        const data = await fetchPoliticoDetalhes(id);
        setPolitico(data);
      } catch (error) {
        console.error(error);
        setPolitico(null);
      } finally {
        setLoading(false);
      }
    };

    loadPolitico();
  }, [id]);

  if (loading) return <p className="loading-text">Carregando informações...</p>;
  if (!politico) return <p className="error-text">Político não encontrado.</p>;

  return (
    <main className="politico-detalhes-container">
      <section className="politico-detalhes-header">
        <img
          src={
            politico.url_foto_tse ||
            `https://placehold.co/160x160/EEE/31343C?text=${politico.nome_parlamentar.charAt(
              0
            )}`
          }
          alt={politico.nome_parlamentar}
          className="politico-detalhes-foto"
        />

        <div className="politico-info">
          <h1>{politico.nome_parlamentar}</h1>
          <p className="partido">{politico.partido}</p>
          <p className="legislatura">Legislatura: {politico.legislatura}</p>
        </div>
      </section>

      {politico.bens_declarados && politico.bens_declarados.length > 0 && (
        <section className="bens-section">
          <h2>Bens declarados</h2>
          <ul>
            {politico.bens_declarados.map((bem, idx) => (
              <li key={idx}>
                <span className="bem-descricao">{bem.descricao}</span>
                <span className="bem-valor">
                  R$ {bem.valor.toLocaleString("pt-BR")}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="voltar-container">
        <Link to="/politicos" className="voltar-button">
          ← Voltar para lista
        </Link>
      </div>
    </main>
  );
};

export default PoliticoDetalhes;