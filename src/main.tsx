

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App.jsx'; 
import './index.css'; 





const appRoot = document.getElementById('root');
if (appRoot) {
  ReactDOM.createRoot(appRoot).render(
    <React.StrictMode>
      {}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}