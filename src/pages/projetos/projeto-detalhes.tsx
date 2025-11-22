
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { type ProjetoDetalhesData, type PoliticoData } from '../../components/types.tsx';
import { fetchProjetoDetalhes, fetchPoliticos } from '../../services/api.ts';
import './projeto-detalhes.css'; 
import Fuse from 'fuse.js'; 


const getStatusClass = (status: string): string => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('aprovado')) return 'status-approved';
    if (statusLower.includes('rejeitado') || statusLower.includes('vetado')) return 'status-vetoed';
    return 'status-discussion';
};


const parseVotos = (votosString: string | null | undefined): string[] => {
    if (!votosString) return [];
    const nomesLimpos = votosString
        .replace(/Vereador\(a\): |Vereadores\(as\): /g, '')
        .replace(/ e /g, ', ');
    
    return nomesLimpos.split(',').map(nome => nome.trim()).filter(nome => nome.length > 0);
};



interface VotoItemProps {
  nomeVotante: string;
  fuseIndex: Fuse<PoliticoData> | null; 
}

const VotoItem: React.FC<VotoItemProps> = ({ nomeVotante, fuseIndex }) => {
    let fotoUrl: string | null = null;
    let nomeReal = nomeVotante; 
    let politicoId: number | undefined = undefined; 

    if (fuseIndex) {
        const results = fuseIndex.search(nomeVotante);
        if (results.length > 0) {
            const bestMatch = results[0].item; 
            fotoUrl = bestMatch.fotoUrl;
            nomeReal = bestMatch.nome; 
            politicoId = bestMatch.id; 
        }
    }

    const finalFotoUrl = fotoUrl || `https://placehold.co/100x100/EEE/31343C?text=${nomeVotante.charAt(0)}`;

    
    const content = (
        <>
            <img src={finalFotoUrl} alt={nomeReal} className="voto-item-foto" />
            <span className="voto-item-nome">{nomeReal}</span>
        </>
    );

    return (
        <li className="voto-item">
            {politicoId ? (
                <Link 
                    to={`/politicos/${politicoId}`} 
                    className="flex items-center gap-3 hover:opacity-70 transition-opacity w-full text-inherit no-underline"
                    title="Ver perfil do vereador"
                >
                    {content}
                </Link>
            ) : (
              
                <div className="flex items-center gap-3 w-full">
                    {content}
                </div>
            )}
        </li>
    );
};



const ProjetoDetalhes: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [projeto, setProjeto] = useState<ProjetoDetalhesData | null>(null);
    const [loading, setLoading] = useState(true);
    
    const [fuseIndex, setFuseIndex] = useState<Fuse<PoliticoData> | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const projetoData = await fetchProjetoDetalhes(id);
                setProjeto(projetoData);

                const politicosData = await fetchPoliticos("", ""); 
                
                const fuseOptions = {
                    keys: ['nome', 'nm_candidato'],
                    threshold: 0.4, 
                    includeScore: true,
                    ignoreLocation: true, 
                };
                const newFuseIndex = new Fuse(politicosData, fuseOptions);
                setFuseIndex(newFuseIndex); 

            } catch (error) {
                console.error(error);
                setProjeto(null);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    if (loading) return <p className="loading-text">Carregando detalhes do projeto...</p>;
    if (!projeto) return <p className="error-text">Projeto não encontrado.</p>;

    const statusClassName = getStatusClass(projeto.status);
    const autores = projeto.authors || []; 

    const votosFavoraveis = parseVotos(projeto.votos_favoraveis);
    const votosContrarios = parseVotos(projeto.votos_contrarios);
    const abstencoes = parseVotos(projeto.votos_abstencoes);
    const ausentes = parseVotos(projeto.votos_ausentes);

    return (
        <main className="projeto-detalhes-container">
            <section className="projeto-detalhes-header">
                <div className="header-content">
                    <span className={`status-badge ${statusClassName}`}>{projeto.status}</span>
                    <h1 className="projeto-title">{projeto.title}</h1>
                    <p className="projeto-summary">{projeto.summary}</p>
                    <div className="data-e-autores">
                        <span>{projeto.date}</span>
                        <div className="author-info-detalhes">
                            {autores.length === 1 && (
                                <>
                                  
                                    {autores[0].id ? (
                                        <Link to={`/politicos/${autores[0].id}`} className="flex items-center gap-2 hover:opacity-80 no-underline text-inherit">
                                            <img src={autores[0].imageUrl} alt={autores[0].name} className="author-image" />
                                            <span className="author-name">{autores[0].name}</span>
                                        </Link>
                                    ) : (
                                        <>
                                            <img src={autores[0].imageUrl} alt={autores[0].name} className="author-image" />
                                            <span className="author-name">{autores[0].name}</span>
                                        </>
                                    )}
                                </>
                            )}
                            {autores.length > 1 && (
                                <div className="author-stack">
                                    {autores.slice(0, 3).map((author, index) => (
                                        <img 
                                            key={index}
                                            src={author.imageUrl} 
                                            alt={`Foto de ${author.name}`} 
                                            className="author-image-stacked"
                                            style={{ zIndex: autores.length - index, marginLeft: index > 0 ? '-10px' : '0' }}
                                        />
                                    ))}
                                    <span className="author-name-multi">{autores.length} Autores</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

          
            <div className="projeto-detalhes-body">
             
                <div className="coluna-tramitacao">
                    <h2 className="coluna-title">Histórico (Tramitação)</h2>
                    <ul className="tramitacao-list">
                        {projeto.tramitacoes && projeto.tramitacoes.length > 0 ? (
                            projeto.tramitacoes.map((item: any) => (
                                <li key={item.id} className="tramitacao-item">
                                    <span className="tramitacao-data">
                                        {new Date(item.data).toLocaleDateString('pt-BR')}
                                    </span>
                                    <div className="tramitacao-info">
                                        <span className="tramitacao-status">{item.status}</span>
                                        <span className="tramitacao-local">Local: {item.local}</span>
                                        {item.observacao && (
                                            <p className="tramitacao-obs">Obs: {item.observacao}</p>
                                        )}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>Nenhum histórico de tramitação encontrado.</p>
                        )}
                    </ul>
                </div>

              
                <div className="coluna-documentos">
                    <h2 className="coluna-title">Documentos (PDFs)</h2>
                    <ul className="arquivos-list">
                        {projeto.arquivos && projeto.arquivos.length > 0 ? (
                            projeto.arquivos.map((item) => (
                                <li key={item.id} className="arquivo-item">
                                    <a
                                        href={item.url_arquivo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fas fa-file-pdf"></i>
                                        {item.nome_arquivo || 'Documento PDF'}
                                    </a>
                                </li>
                            ))
                        ) : (
                            <p>Nenhum documento anexado.</p>
                        )}
                    </ul>
                </div>

             
                <div className="coluna-votacao">
                    <h2 className="coluna-title">Resultado da Votação</h2>
                    <div className="votacao-resumo">
                        <span className={`status-badge-grande ${statusClassName}`}>
                            {projeto.status || 'Resultado não disponível'}
                        </span>
                    </div>

                    {(votosFavoraveis.length > 0 ||
                        votosContrarios.length > 0 ||
                        abstencoes.length > 0 ||
                        ausentes.length > 0) && (
                        <div className="votacao-grid">
                            <div className="lista-votos favor">
                                <h3>
                                    <i className="fas fa-check-circle"></i> Favoráveis (
                                    {votosFavoraveis.length})
                                </h3>
                                <ul>
                                    {votosFavoraveis.map((nome) => (
                                        <VotoItem
                                            key={nome}
                                            nomeVotante={nome}
                                            fuseIndex={fuseIndex}
                                        />
                                    ))}
                                </ul>
                            </div>

                            <div className="lista-votos contra">
                                <h3>
                                    <i className="fas fa-times-circle"></i> Contrários (
                                    {votosContrarios.length})
                                </h3>
                                <ul>
                                    {votosContrarios.map((nome) => (
                                        <VotoItem
                                            key={nome}
                                            nomeVotante={nome}
                                            fuseIndex={fuseIndex}
                                        />
                                    ))}
                                </ul>
                            </div>

                            {abstencoes.length > 0 && (
                                <div className="lista-votos abstencao">
                                    <h3>
                                        <i className="fas fa-minus-circle"></i> Abstenções (
                                        {abstencoes.length})
                                    </h3>
                                    <ul>
                                        {abstencoes.map((nome) => (
                                            <VotoItem
                                                key={nome}
                                                nomeVotante={nome}
                                                fuseIndex={fuseIndex}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {ausentes.length > 0 && (
                                <div className="lista-votos ausente">
                                    <h3>
                                        <i className="fas fa-user-clock"></i> Ausentes (
                                        {ausentes.length})
                                    </h3>
                                    <ul>
                                        {ausentes.map((nome) => (
                                            <VotoItem
                                                key={nome}
                                                nomeVotante={nome}
                                                fuseIndex={fuseIndex}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="voltar-container">
                <Link to="/projetos" className="voltar-button">
                    ← Voltar para todos os projetos
                </Link>
            </div>
        </main>
    );
};

export default ProjetoDetalhes;