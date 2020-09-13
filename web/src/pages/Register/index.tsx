import React from 'react';

import Header from '../../components/Header';
import ToggleStats from '../../components/ToggleStats';

import { Container } from './styles';

const Register = () => {

  const handleInputCheck = () => {};
  
  return (
    <Container>
      <Header />
      <ToggleStats handleInputCheck={handleInputCheck} />

      <p>Registrar</p>

      
    </Container>
  )
};

export default Register;