import React from 'react'
import { Main as GrommetMain } from 'grommet'
import styled from 'styled-components'

const Main = styled(GrommetMain).attrs(props => ({
  fill: props.fill,
  gap: props.gap,
  pad: props.pad,
  role: 'main'
}))`
  margin: 0;
  position: relative;
  overflow-wrap: break-word;
`

export default ({ children, ...props }) => <Main {...props}>{children}</Main>
