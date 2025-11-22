
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/header/header'; 
import Home from './pages/home/home';
import Projetos from './pages/projetos/projetos';
import ProjetoDetalhes from './pages/projetos/projeto-detalhes';


import Politicos from './pages/politicos/politicos';
import PoliticoDetalhes from './pages/politicos/politicos-detalhes';


const AppLayout = () => {
  return (
    <div>
      <Header /> 

      <main>
        <Outlet /> 
      </main>

     
    </div>
  );
};


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}> {}
        <Route index element={<Home />} />
        
        {}
        <Route path="politicos" element={<Politicos />} />
        
        <Route path="projetos" element={<Projetos />} />
        
        {}
        <Route path="politicos/:id" element={<PoliticoDetalhes />} />
        <Route path="projetos/:id" element={<ProjetoDetalhes />} />


        {}
      </Route>
    </Routes>
  );
};

export default App;