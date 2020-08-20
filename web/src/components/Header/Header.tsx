import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="header-left">
        <p>Home</p>
      </div>

      <div className="header-right">
        <p>Registrar</p>
        <p>Login</p>
        <p>Sobre</p>
      </div>
    </header>
  )
};

export default Header;