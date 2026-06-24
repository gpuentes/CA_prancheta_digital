import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { FluentProvider, webLightTheme, webDarkTheme, teamsHighContrastTheme } from '@fluentui/react-components';
import App from './App.jsx';
import { initAnalytics } from './modules/analytics';
import './style.css';

// Inicializa a auditoria silenciosa
initAnalytics();

// Interceptador global (depuração de white screens)
window.addEventListener('error', (e) => {
  const errorHtml = `<div style="padding:20px;background:#fff1f0;border:1px solid #ffa39e;color:#cf1322;font-family:sans-serif;position:fixed;top:0;left:0;right:0;z-index:9999;">
    <h3>❌ Erro Crítico (Tela Branca)</h3>
    <strong>Mensagem:</strong> ${e.message}<br/>
    <pre style="margin-top:10px;background:#fff;padding:10px;overflow:auto;">${e.error?.stack || ''}</pre>
  </div>`;
  if (document.body) document.body.insertAdjacentHTML('afterbegin', errorHtml);
});

// Wrapper reativo para sincronizar o Fluent UI com as variáveis de A11y (Modo Escuro / Alto Contraste)
function ThemeWrapper({ children }) {
  const [themeMode, setThemeMode] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');
  const [isHighContrast, setIsHighContrast] = useState(() => document.documentElement.classList.contains('high-contrast'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeMode(document.documentElement.getAttribute('data-theme') || 'light');
      setIsHighContrast(document.documentElement.classList.contains('high-contrast'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    return () => observer.disconnect();
  }, []);

  let currentTheme = themeMode === 'dark' ? webDarkTheme : webLightTheme;
  if (isHighContrast) currentTheme = teamsHighContrastTheme;

  return <FluentProvider theme={currentTheme}>{children}</FluentProvider>;
}

// Configura o tema inicial no boot
const savedTheme = localStorage.getItem('theme');
const prefersDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
if (prefersDark) document.documentElement.setAttribute('data-theme', 'dark');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </React.StrictMode>,
);
