import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
  margin: 20px 0;

  p {
    margin-left: auto;
  }

  @media (max-width: 700px) {
    margin: 30px 0 10px 0;

    p {
      margin-left: initial;
    }
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -10px;

  position: absolute;
  z-index: 2;
  overflow: hidden;

  border: 2px solid var(--primary-color);
  border-radius: 8px;
  background-color: var(--primary-color);

  max-height: 3.4rem;
  transition: max-height .2s ease-out, border-color .3s, filter .2s;

  &:hover {
    max-height: 320px;
    border-color: #fff;
    filter: brightness(113%);
    transition: max-height .2s ease-in;

    p {
      background-color: rgba(0,0,0, 0.2);
    }
  }

  p {
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 8px 8px 0 0;
  }

  @media (max-width: 700px) {
    top: -28px;
  }
`;

