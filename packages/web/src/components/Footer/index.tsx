import React from 'react';

import { Container } from './styles';

import logoImg from '../../assets/logo.png';

const Footer: React.FC = () => {
  const currentYear =  new Date().getFullYear();

  return (
    <Container>
      <p>Copyrights
        <a href="http://localhost:3000">©WeatherHub</a>
        {currentYear}
        <img src={logoImg} alt="WeatherHub"/>
      </p>
    </Container>
  )
};

export default Footer;