import React from 'react';
import ReactDOM from 'react-dom/client';
import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import App from './App.jsx';
import './style.css';

// Determine initial theme
const savedTheme = localStorage.getItem('theme');
const prefersDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
const initialTheme = prefersDark ? webDarkTheme : webLightTheme;

if (prefersDark) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FluentProvider theme={initialTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>,
);
