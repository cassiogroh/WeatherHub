import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './hooks';
import Header from './components/Header';

import GlobalStyle from './styles/global';

import Routes from './routes';

function App() {
  return (
    <Router>
      <AppProvider>
        <Header />
        <Routes />
      </AppProvider>
      
      <GlobalStyle />
    </Router>
  );
}

export default App;
