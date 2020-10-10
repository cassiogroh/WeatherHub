import React, { useState, useCallback } from 'react';

import { useAuth } from '../../hooks/auth';

import Link from './Link';

import { Container, NavBar } from './styles';

interface HeaderProps {
  currentPage: string;
};

const Header: React.FC<HeaderProps> = ({ currentPage }: HeaderProps) => {
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

  const setScrollToZero = useCallback(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <Container>
      <NavBar activateNavbar={activateNavbar}>
        <div>
          <Link to="/" pageName='Home' currentPage={currentPage} activateNavbar={activateNavbar} onClick={setScrollToZero} />
        </div>

        <div>
          {!!user ? 
          <Link to="dashboard" pageName='Dashboard' currentPage={currentPage} activateNavbar={activateNavbar} onClick={setScrollToZero} />
          : (
            <>
              <Link to="signin" pageName='Login' currentPage={currentPage} activateNavbar={activateNavbar} />
              <Link to="signup" pageName='Registrar' currentPage={currentPage} activateNavbar={activateNavbar} />
            </>
          )
          }
          <Link to="about" pageName='Sobre' currentPage={currentPage} activateNavbar={activateNavbar} />
        </div>
      </NavBar>
    </Container>
  )
};

export default Header;