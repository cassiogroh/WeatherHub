import styled, { css } from 'styled-components';

interface RequestProps {
  currentPage: string;
  pageName: string;
  activateNavbar: boolean;
}

export const Container = styled.div<RequestProps>`
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

    @media (max-width: 500px) {
      font-weight: 400;
      font-size: 1.8rem;
    }

    &::after {
      content: '';
      display: block;
      height: 3px;
      margin-top: 7px;
      border-radius: 10px;
      transition: width .2s ease-out;

      @media (max-width: 500px) {
        margin-top: 3px;
      }
      
      ${props => props.currentPage === props.pageName ?
      css`width: 100%;` :
      css`width: 0;`
      }
      
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
`;