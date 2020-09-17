import styled, { css } from 'styled-components';

interface NavbarProps {
  activateNavbar: boolean;
}

export const Container = styled.header`
  position: fixed;
  z-index: 3;
  top: 0;
  width: 90vw;
  max-width: 1100px;
  transition: filter .2s;

  &:hover {
    filter: brightness(113%);
  }
`;

export const NavBar = styled.div<NavbarProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 2px solid var(--divider-color);
  border-radius: 0 0 10px 10px;
  
  transition: background-color .3s, padding .3s;

  ${props => props.activateNavbar ?
  css`
  background-color: rgba(45, 45, 45, .95);
  padding: 0 3px 3px 3px;
  ` :
  css`
  background-color: var(--bg-form);
  padding: 5px;
  `}
  
  div {
    display: flex;

    a {
      font-size: 2.4rem;
      font-weight: 500;
      transition: background-color .2s, padding .3s;

      ${props => props.activateNavbar ?
      css`
      padding: 0 10px 0 10px;
      border-radius: 0 0 10px 10px;
      ` :
      css`
      padding: 5px 10px 0 10px;
      border-radius: 10px;
      `}

      &:hover {
        cursor: pointer;
        background-color: rgba(0,0,0, 0.2);
      }

      &::after {
        content: '';
        display: block;
        width: 0;
        height: 3px;
        margin-top: 7px;
        border-radius: 10px;
        transition: width .2s ease-out;

        ${props => props.activateNavbar ?
        css`
        background: var(--primary-color);
        ` :
        css`
        background: var(--text-color);
        `}
      }

      &:hover::after {
        width: 100%;
        transition: width .2s ease-in;
      }
    }
  }

  @media (max-width: 500px) {
    padding: 0;
    
    div {
      a {
        font-weight: 400;
        font-size: 1.8rem;
      }
    }
  }
`;