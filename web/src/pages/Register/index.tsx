import React from 'react';
import Dropdown from 'react-dropdown';

import Header from '../../components/Header';
import ToggleStats from '../../components/ToggleStats';

import { Container } from './styles';

const Register = () => {

  const handleInputCheck = () => {}

  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = 'Opções de visualização';

  return (
    <Container>
      <Header />
      <ToggleStats handleInputCheck={handleInputCheck} />
      <Dropdown
        options={options}
        value={defaultOption}
        placeholder="Select an option"
      />
      <p>Registrar</p>

      
    </Container>
  )
};

export default Register;