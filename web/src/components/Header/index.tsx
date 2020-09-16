import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Container, NavBar } from './styles';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <NavBar>
        <div>
          <Link to="/">
            Home
          </Link>
        </div>

        <div>
          {!!user ? 
          <Link to='dashboard'>
            Dashboard
          </Link>
          : (
            <>
              <Link to='signin'>Login</Link>
              <Link to='signup'>Registrar</Link>
            </>
          )
          }
          <Link to='about'>Sobre</Link>
        </div>
      </NavBar>
    </Container>
  )
};

export default Header;