# 🏛️ Câmara Aberta - Transparência Legislativa Municipal

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Google Cloud Run](https://img.shields.io/badge/Google_Cloud_Run-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/run)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)

**Câmara Aberta** é uma plataforma de acompanhamento legislativo municipal dedicada a promover maior transparência e participação cidadã. O sistema centraliza atas, projetos de lei e votações, oferecendo uma interface amigável para que a população possa fiscalizar o trabalho dos vereadores e o andamento das proposições na cidade.

## ✨ Funcionalidades Principais

* **🔍 Busca de Proposições:** Ferramenta de pesquisa para encontrar projetos de lei e documentos legislativos de forma rápida e eficiente.
* **📊 Perfil dos Parlamentares:** Página dedicada a cada vereador, contendo informações sobre partido, legislatura, histórico e bens declarados.
* **🗳️ Detalhamento de Votações:** Visualização clara do posicionamento de cada parlamentar (favorável, contrário, abstenção ou ausência) em cada projeto votado.
* **📄 Acesso a Documentos:** Disponibilização de arquivos PDF originais das leis e atas para consulta na íntegra.
* **📈 Painel de Estatísticas:** Dados quantitativos sobre o volume de projetos aprovados, em tramitação e vetados na legislatura atual.

## 🛠️ Tecnologias Utilizadas

### Front-end
* **React 19** & **Vite**: Para uma aplicação web de alta performance e carregamento rápido.
* **TypeScript**: Garante segurança de tipos e facilita a manutenção do código.
* **Tailwind CSS**: Framework de estilos para um design moderno e responsivo.
* **React Router DOM**: Navegação fluida entre as páginas de projetos e políticos.
* **Fuse.js**: Biblioteca leve para busca de texto no front-end.

### Back-end & Dados
* **Python (Flask) & Google Cloud Run**: API responsável pelo processamento de dados e regras de negócio, garantindo escalabilidade e performance.
* **Supabase**: Utilizado como banco de dados (PostgreSQL), autenticação e armazenamento de arquivos.

## 📂 Estrutura do Repositório (Front-end)

```text
camara-aberta/
├── public/              # Arquivos estáticos públicos
├── src/
│   ├── assets/          # Ícones e imagens
│   ├── components/      # Componentes de UI (Cards, Header, Footer)
│   ├── pages/           # Páginas da aplicação (Home, Políticos, Projetos)
│   ├── services/        # Integração com APIs (Flask/Supabase)
│   ├── App.tsx          # Configuração principal e Rotas
│   └── main.tsx         # Ponto de entrada da aplicação React
├── .env                 # Configuração de ambiente (local)
└── package.json         # Gerenciamento de dependências