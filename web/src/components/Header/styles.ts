import styled from 'styled-components';

export const Container = styled.header`
  max-width: 95vw;
  width: 100%;
  margin: 0;
  padding: 0;
  transition: filter .2s;

  &:hover {
    filter: brightness(113%);
  }
`;

export const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin:   0;
  border: 2px solid var(--divider-color);
  border-radius: 0 0 10px 10px;
  padding: 10px;
  background-color: var(--bg-form);

  div {
    a, p {
      font-size: 2.4rem;
      font-weight: 500;
      border-radius: 10px;
      padding: 10px;
      transition: background-color .2s;

      &:hover {
        cursor: pointer;
        background-color: rgba(0,0,0, 0.2)
      }
    }
  }

  @media (max-width: 500px) {
    padding: 0;
    
    div {
      a {
        font-size: 1.8rem;
      }
    }
  }

  div + div {
    display: flex;
  }
`;