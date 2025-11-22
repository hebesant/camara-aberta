


const API_URL = "https://api-camara-aberta-254789873933.southamerica-east1.run.app";
const CIDADE_ID_ITU = 1;


import {
  type PoliticoData,
  type PoliticoDetalhesData,
  type ProjectData,
  type ProjetoDetalhesData
} from '../components/types.tsx';


export const fetchPoliticos = async (
  legislatura: string,
  searchTerm: string
): Promise<PoliticoData[]> => {
  try {
    const url = new URL(
      `${API_URL}/api/cidades/${CIDADE_ID_ITU}/politicos`
    );
    url.searchParams.append("legislatura", legislatura);
    if (searchTerm) {
      url.searchParams.append("search", searchTerm);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.erro || response.statusText);
    }

    const data = await response.json();

    if (data && Array.isArray(data)) {
      const formattedPoliticos: PoliticoData[] = data.map((politico: any) => ({
        id: politico.id_sequencial_tse,
        nome: politico.nome_parlamentar,
        partido: politico.partido || "Sem partido",
        nm_candidato: politico.nm_candidato,
        fotoUrl:
          politico.url_foto_tse ||
          politico.url_foto_camara ||
          `https://placehold.co/128x128/EEE/31343C?text=${politico.nome_parlamentar.charAt(
            0
          )}`,
      }));
      return formattedPoliticos;
    }
    return [];
  } catch (error: any) {
    console.error("Erro ao buscar políticos:", error.message);
    return [];
  }
};

export const fetchPoliticoDetalhes = async (
  id: string
): Promise<PoliticoDetalhesData | null> => {
  try {
    const response = await fetch(`${API_URL}/api/politicos/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar político");
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};


export const fetchProjetos = async (
  page: number,
  searchTerm: string,
  startDate?: string, 
  endDate?: string    
): Promise<ProjectData[]> => {
  try {
    const url = new URL(`${API_URL}/api/cidades/${CIDADE_ID_ITU}/votacoes`);
    url.searchParams.append('page', page.toString());
    if (searchTerm) {
      url.searchParams.append('search', searchTerm);
    }
    
    
    if (startDate) {
        url.searchParams.append('start_date', startDate);
    }
    if (endDate) {
        url.searchParams.append('end_date', endDate);
    }


    const response = await fetch(url.toString());
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.erro || response.statusText);
    }

    const data = await response.json();

    if (data && Array.isArray(data)) {
      
      const formattedProjects: ProjectData[] = data.map((project: any) => {
        
        const authorsList: { id?: number; name: string; imageUrl: string }[] = [];

        
        if (project.votacoes_autores && project.votacoes_autores.length > 0) {
          project.votacoes_autores.forEach((item: any) => {
            const politico = item.politicos_eleitos;
            if (politico) {
              const nome = politico.nome_parlamentar || 'Nome Desconhecido';
              const foto = politico.url_foto_tse || `https://placehold.co/100x100/EEE/31343C?text=${nome.charAt(0)}`;
              
              authorsList.push({
                  id: politico.id_sequencial_tse,
                  name: nome, 
                  imageUrl: foto 
              });
            }
          });
        } else {
         
          const autorNome = project.autor || 'Autoria não encontrada';
          const autorFoto = `https://placehold.co/100x100/EEE/31343C?text=${autorNome.charAt(0)}`;
          authorsList.push({ name: autorNome, imageUrl: autorFoto });
        }

        return {
          id: project.id,
          status: project.resultado || project.fase_discussao || 'Indisponível',
          title: project.titulo_documento || 'Título não disponível',
          summary: project.assunto_documento || 'Assunto não disponível',
          date: new Date(project.data_sessao).toLocaleDateString('pt-BR'),
          tags: ['Legislação Municipal'],
          authors: authorsList 
        };
      });
      return formattedProjects;
    }
    return [];
  } catch (error: any) {
    console.error('Erro ao buscar projetos:', error.message);
    return [];
  }
};


export const fetchProjetoDetalhes = async (
  id: string
): Promise<ProjetoDetalhesData | null> => {
  try {
    const response = await fetch(`${API_URL}/api/votacoes/${id}`); 
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.erro || "Erro ao buscar detalhes do projeto");
    }
    
    const data = await response.json();
    if (!data) return null;

  
    let authorsList: { id?: number; name: string; imageUrl: string }[] = [];
    
    if (data.autores && data.autores.length > 0) { 
      authorsList = data.autores.map((politico: any) => {
          const nome = politico.nome_parlamentar || 'Nome Desconhecido';
          const foto = politico.url_foto_tse || `https://placehold.co/100x100/EEE/31343C?text=${nome.charAt(0)}`;
          
        
          return { 
            id: politico.id_sequencial_tse,
            name: nome, 
            imageUrl: foto 
          };
      });
    } else {
      const autorNome = data.autor || 'Autoria não encontrada';
      const autorFoto = `https://placehold.co/100x100/EEE/31343C?text=${autorNome.charAt(0)}`;
      authorsList = [{ name: autorNome, imageUrl: autorFoto }];
    }
    

    let tramitacoesList: any[] = [];
    if (data.tramitacoes && Array.isArray(data.tramitacoes)) {
      tramitacoesList = data.tramitacoes.map((item: any) => ({
        id: item.id,
        data: item.data_envio,
        local: item.destinatario,
        status: item.objetivo,
        observacao: item.complemento
      }));
    }
    
    
    const projetoFormatado: ProjetoDetalhesData = {
      id: data.id,
      status: data.resultado || data.fase_discussao || 'Indisponível',
      title: data.titulo_documento || 'Título não disponível',
      summary: data.assunto_documento || 'Assunto não disponível',
      date: new Date(data.data_sessao).toLocaleDateString('pt-BR'),
      tags: ['Legislação Municipal'],
      authors: authorsList,

      // --- Dados Detalhados ---
      votos_favoraveis: data.votos_favoraveis_texto,
      votos_contrarios: data.votos_contrarios_texto,
      votos_abstencoes: data.votos_nao_vota_texto,
      votos_ausentes: data.votos_ausentes_texto,
      
      tramitacoes: tramitacoesList,
      arquivos: data.arquivos || []
    };
    
    return projetoFormatado;

  } catch (error: any) {
    console.error("Erro ao buscar detalhes do projeto:", error.message);
    return null;
  }
};