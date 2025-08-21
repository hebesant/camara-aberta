import './App.css';
import votacoesData from './dados_votacoes.json';

// Passo 1: Criamos um "molde" que descreve um objeto de votação
type Votacao = {
  data_votacao: string;
  objeto_da_votacao: string;
  projetos_relacionados: string[];
  resumo: string;
  resultado: string;
  votos: {
    vereador: string;
    voto: string;
  }[];
};

function App() {
  // Garantimos que o TypeScript entenda que nossos dados seguem o molde
  const dadosDasVotacoes: Votacao[] = votacoesData;

  console.log("Dados das votações carregados:", dadosDasVotacoes);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Câmara Aberta - Votações</h1>
      </header>
      <main>
        <h2>Votações da Sessão de {dadosDasVotacoes[0]?.data_votacao}</h2>
        
        {/* Passo 2: Agora o .map() sabe exatamente o que são 'votacao' e 'index' */}
        {dadosDasVotacoes.map((votacao, index) => (
          <div key={index} className="votacao-card">
            <h3>{votacao.objeto_da_votacao}</h3>
            <p><strong>Projetos Relacionados:</strong> {votacao.projetos_relacionados.join(', ')}</p>
            <p><strong>Resumo:</strong> {votacao.resumo}</p>
            <p><strong>Resultado:</strong> <span className={`resultado ${votacao.resultado.toLowerCase()}`}>{votacao.resultado}</span></p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;