import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './hooks';
import Header from './components/Header';
import Footer from './components/Footer';

import GlobalStyle from './styles/global';

import Routes from './routes';

function App() {
  return (
    <Router>
      <AppProvider>
        <Header />
        <Routes />
        <Footer />
      </AppProvider>
      
      <GlobalStyle />
    </Router>
  );
}

export default App;
