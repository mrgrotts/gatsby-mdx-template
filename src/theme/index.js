import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { Grommet } from 'grommet'

import theme from './theme'

const GlobalStyle = createGlobalStyle`
  img {
    max-width: 100%;
  }

  body {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  a:active, a:focus, a:hover {
    opacity: 0.9;
    text-decoration: none;
  }
`

const Theme = ({ children, themeMode }) => {
  return (
    <Grommet theme={theme} themeMode={themeMode}>
      <GlobalStyle />
      {children}
    </Grommet>
  )
}

export default Theme
