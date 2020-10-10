import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasdescription: boolean;
};

const toastTypeVariations = {
  info: css`
    background: #333;
    color: #3172B7;
  `,
  success: css`
    background: #333;
    color: var(--button-color);
  `,
  error: css`
  background: #333;
  color: var(--error-color);
`
};

export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;

  position: relative;
  z-index: 3;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  & + div {
    margin-top: 8px
  }

  ${props => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    strong {
      letter-spacing: 1px;
    }

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props => !props.hasdescription && css`
    align-items: center;

    svg {
      margin-top: 0;
    }
  `}
`;