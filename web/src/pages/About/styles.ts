import styled, { keyframes } from 'styled-components';

import logoImg from '../../assets/logo.png';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

const AppearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  margin: 0 50px;
  width: 50%;


  animation: ${AppearFromLeft} 1s;
  
  p {
    text-align: justify;
  }
`;

export const Background = styled.div`
  background: url(${logoImg}) no-repeat center;
  background-position-y: 80px;
  background-size: 300px;
  height: 400px;
  width: 400px;
`;