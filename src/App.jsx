import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { makeStyles, Title1, Button } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  }
});

function Home() {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Title1>CA Prancheta Digital</Title1>
        <p>Selecione o módulo de operação:</p>
        <Link to="/monitor">
          <Button appearance="primary" size="large" style={{ width: '100%' }}>Módulo Prancheta (Monitor)</Button>
        </Link>
        <Link to="/diretoria">
          <Button appearance="outline" size="large" style={{ width: '100%' }}>Painel Campainha (Diretoria)</Button>
        </Link>
      </div>
    </div>
  );
}

import Monitor from './pages/Monitor.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monitor" element={<Monitor />} />
        <Route path="/diretoria" element={<div>Módulo Campainha em construção...</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
