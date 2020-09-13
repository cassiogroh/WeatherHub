import styled from 'styled-components';

export const Container = styled.label`
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 3px;

  cursor: pointer;

  &:hover {
    background-color: rgba(0,0,0, 0.2);
  }

  input {
    margin-right: 5px;
    margin-left: 3px;
  }
`;