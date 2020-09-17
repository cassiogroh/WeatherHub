import styled from 'styled-components';

export const Container = styled.footer`
  padding: 10px 40%;

  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;

  p {
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 5px;
    opacity: 15%;

    transition: opacity .3s;

    &:hover {
      opacity: 100%;
    }

    a {
      margin: 0 5px;
    }

    img {
      margin-left: 15px;
      width: 20px;
    }
  }
`;