import React from 'react';
import { Link } from 'react-router-dom';

import { Container, NavBar } from './styles';

const Header = () => {
  return (
    <Container>
      <NavBar>
        <div>
          <Link to='/'>
            Home
          </Link>
        </div>

        <div>
          <Link to='register'>Registrar</Link>
          <p>Login</p>
          <Link to='about'>Sobre</Link>
        </div>
      </NavBar>
    </Container>
  )
};

export default Header;