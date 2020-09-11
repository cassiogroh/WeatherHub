import styled from 'styled-components';

export const Container = styled.div`
  border: 0.2rem solid var(--divider-color);
  border-radius: 0.8rem;
  background: radial-gradient(var(--card-primary-color), var(--card-secondary-color));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.6rem;
  transition: filter .2s;

  &:hover {
    filter: brightness(113%);
  }
`;

export const CardStats = styled.div`
  text-align: left;
  width: 100%;
  
  a {
    display: flex;
    flex: 1;
    place-content: center;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 10px;
    transition: background-color .2s;
    
    &:hover {
    background-color: rgba(0,0,0, 0.2);
    }
  }

  p {
    display: flex;
    justify-content: space-between;
    padding: 3px;
    border-radius: 10px;
    transition: background-color .2s;

    &:hover {
      background-color: rgba(0,0,0, 0.2);
    }

    &:last-child {
      margin-bottom: 10px;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      width: 100%;
      justify-content: center;
      margin-bottom: 5px;
    }
  }
`;

export const CardBottom = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 1rem;
  }

  div {
    display: flex;
    align-content: center;
  }

  button {
    background-color: transparent;
    border: none;
    border-radius: 10px;
    padding: 4px;
    display: flex;
    align-content: center;
    transition: background-color .2s, transform .2s;

    &:hover {
      transform: scale(1.03);
      background-color: rgba(0,0,0, 0.2);
    }
  }
`;