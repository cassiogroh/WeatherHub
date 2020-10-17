import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
  margin: 20px 0;

  p {
    margin-left: auto;
  }

  @media (max-width: 900px) {
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

  @media (max-width: 900px) {
    top: -28px;
  }
`;

export const AddStationForm = styled.form`
  display: flex;
  margin-top: -10px;
  left: 197px;

  position: absolute;
  z-index: 2;

  input {
    border: 0;
    border-radius: 8px 0 0 8px;
    color: #fff;
    background-color: #3b5998;
    height: 3.4rem;
    padding: 10px;
    width: 150px;

    &::placeholder {
      color: #AAA;
    }
  }

  button {
    height: 3.4rem;
    width: 3.4rem;
    border-radius: 0 8px 8px 0;
    border: 0;
    background: #EEE;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color .2s, box-shadow .2s;
    
    &:hover {
      background-color: #fff;
      box-shadow: 0 0 5px #FFF;
    }
  }

  @media (max-width: 900px) {
    top: -28px;

    input {
      width: 130px;
    }
  }
`;

