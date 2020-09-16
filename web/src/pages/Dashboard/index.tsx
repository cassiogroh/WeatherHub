import React from 'react';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <h1>Dashboard</h1>

      <button style={{backgroundColor: 'transparent'}} type='button' onClick={signOut}>
        Logout
      </button>
    </Container>
  )
};

export default Dashboard;