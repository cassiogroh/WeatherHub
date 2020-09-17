import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Container, NavBar } from './styles';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [activateNavbar, setActivateNavbar] = useState(false);

  const changeNavbarBackground = useCallback(() => {
    if (window.scrollY >= 30) {
      setActivateNavbar(true);
    } else {
      setActivateNavbar(false);
    }
  }, [])

  window.addEventListener('scroll', changeNavbarBackground);

  return (
    <Container>
      <NavBar activateNavbar={activateNavbar}>
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