import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import ThemeProvider from './context/ThemeContext.tsx';

const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  root
);