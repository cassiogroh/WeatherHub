import styled, { keyframes } from 'styled-components';

import backgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
`;

export const Background = styled.div`
  background: url(${backgroundImg}) no-repeat center;
  background-position-y: 80px;
  background-size: contain;
  height: 400px;
  width: 400px;
  margin-right: 100px;

  h1 {
    text-align: center;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 50px;
`;

const AppearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${AppearFromRight} 1s;

  form {
    margin: 40px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      color: var(--text-color)
    }
  }
`;