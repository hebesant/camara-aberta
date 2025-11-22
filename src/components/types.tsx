

export interface ProjectData {
    id: number;
    status: string; 
    title: string;
    date: string;
    summary: string;
    tags: string[];
    authors: { 
        id?: number;
        name: string;
        imageUrl: string;
    }[];
}

export interface ProjetoDetalhesData extends ProjectData {
    
    resultado?: string | null;
    votos_favoraveis?: string | null;
    votos_contrarios?: string | null;
    votos_abstencoes?: string | null;
    votos_ausentes?: string | null;
    
    tramitacoes?: {
        id: number;
        data: string;
        local: string;
        status: string;
        observacao: string;
    }[];
    arquivos?: {
        id: number;
        nome_arquivo: string;
        url_arquivo: string;
    }[];
}


export interface PoliticoData {
  id: number; 
  nome: string; 
  partido: string;
  fotoUrl: string;
  nm_candidato?: string; 
}

export interface PoliticoDetalhesData {
  id_sequencial_tse: number;
  nome_parlamentar: string;
  partido: string;
  legislatura: string;
  url_foto_tse?: string;
  bens_declarados?: { descricao: string; valor: number }[];
}


export interface FeatureData {
    id: number;
    icon: string;
    title: string;
    description: string;
}

export type StatData = {
  id: number;
  value: string;
  label: string;
};