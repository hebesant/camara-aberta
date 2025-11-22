import React from 'react';
import { Link } from 'react-router-dom';


import { type PoliticoData } from '../types.tsx';


import './politico-card.css';


interface PoliticoCardProps {
  
  politico: PoliticoData;
}


const PoliticoCard: React.FC<PoliticoCardProps> = ({ politico }) => {
  return (
    
    <div className="politico-card">
      <img
        src={politico.fotoUrl}
        alt={`Foto do Político ${politico.nome}`}
        className="politico-foto"
      />
      <h3 className="politico-nome">
        {politico.nome}
      </h3>
      <p className="politico-partido">
        {politico.partido}
      </p>
      
      <Link
        
        to={`/politicos/${politico.id}`}
        className="politico-link-detalhes"
      >
        Ver detalhes
      </Link>
    </div>
  );
};

export default PoliticoCard;