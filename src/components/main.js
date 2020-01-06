import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'

const Main = styled.main.attrs(props => ({
  role: 'main'
}))`
  margin: 0;
  padding: 0;
  position: relative;
  overflow-wrap: break-word;
`

export default ({ children }) => (
  <Main>
    <Box pad={'medium'}>{children}</Box>
  </Main>
)
