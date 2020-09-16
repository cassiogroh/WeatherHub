import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --bg-color              : #252525; /* eee 333 */
    --bg-color-dark         : #333;
    --bg-form               : #3b5998;
    --primary-color         : #3b5998;
    --card-primary-color    : #3C58aa;
    --card-secondary-color  : #3b5998;
    --button-color          : #1DB954;
    --text-color            : #ddd;

    font-size: 62.5%;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
  }

  html,
  body,
  #root {
    height: 100vh;
    width: 90vw;
    max-width: 1100px;
    margin: 0 auto;
  }

  body,
  input,
  button,
  textarea,
  p, a {
    font-family: 'Roboto Slab', serif;
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--text-color);
  }

  a {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  h1 {
    font-family: 'Roboto Slab', serif;
    font-size: 2.5rem;
    font-weight: 500;
    color: var(--text-color);
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: var(--bg-color);
  }
`;
