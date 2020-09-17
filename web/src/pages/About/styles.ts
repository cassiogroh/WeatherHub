import styled, { keyframes } from 'styled-components';

import logoImg from '../../assets/logo.png';

export const Container = styled.div`
  display: flex;
  align-items: center;
  /* margin-top: 80px; */
  padding-top: 100px;

  @media (max-width: 980px) {
    position: relative;
  }
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
  margin: 0 100px;
  width: 50%;


  animation: ${AppearFromLeft} 1s;
  
  p {
    text-align: justify;
  }

  @media (max-width: 980px) {
    width: 80%;
  }
`;

export const Background = styled.div`
  background: url(${logoImg}) no-repeat center;
  background-position-y: 80px;
  background-size: 300px;
  height: 400px;
  width: 400px;

  @media (max-width: 980px) {
    position: absolute;
    z-index: -1;
    opacity: 20%;
    left: 40%;
  }

  @media (max-width: 500px) {
    background-size: 200px;
    height: 300px;
    width: 300px;
    left: 30%;
  }
`;