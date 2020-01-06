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
