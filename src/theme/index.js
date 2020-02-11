import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { Grommet } from 'grommet'

import theme from './theme'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  a {
    text-decoration: none;

    :active, :focus, :hover {
      opacity: 0.9;
      text-decoration: none;
    }
  }

  button {
    :active {
      border: none;
    }

    :focus {
      outline: none;
    }
  }

  img {
    max-width: 100%;
  }
`

const Theme = ({ children, themeMode }) => (
  <Grommet theme={theme} themeMode={themeMode} style={{ height: '100%' }}>
    <GlobalStyle />
    {children}
  </Grommet>
)

export default Theme
