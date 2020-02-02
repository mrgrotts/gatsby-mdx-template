import React from 'react'
import { Box, Header as GrommetHeader, ResponsiveContext } from 'grommet'
import styled from 'styled-components'

import Logo from './logo'
import Nav from './nav'

const ThemedHeader = styled(GrommetHeader)`
  align-items: center;
  box-sizing: border-box;
  flex: 0 0 auto;
  flex-direction: row;
  grid-area: header;
  justify-content: space-between;
  max-width: 100%;
  min-height: 0;
  min-width: 0;
  outline: none;
  position: ${({ device }) => (device === 'small' ? 'fixed' : 'relative')};
  top: 0;
  width: 100%;
  z-index: 10;
`

const Header = ({ ...props }) => (
  <ResponsiveContext.Consumer>
    {responsive => (
      <ThemedHeader
        background={'background-front'}
        device={responsive}
        height={`xsmall`}
        {...props}
      >
        <Box
          align={`center`}
          fill
          direction={`row`}
          justify={`between`}
          pad={{ horizontal: 'medium', vertical: 'small' }}
        >
          <Logo />
          <Nav />
        </Box>
      </ThemedHeader>
    )}
  </ResponsiveContext.Consumer>
)

export default Header
