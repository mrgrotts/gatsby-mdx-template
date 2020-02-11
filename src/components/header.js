import React from 'react'
import { Box, Header as GrommetHeader, ResponsiveContext } from 'grommet'
import styled from 'styled-components'

import Logo from './logo'
import Nav from './nav'

import { StorageState } from '../hooks/storage'

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
  position: ${({ open }) => (open ? 'fixed' : 'relative')};
  top: 0;
  width: 100%;
  z-index: 10;
`

const Header = ({ theme, ...props }) => {
  const [open, toggle] = StorageState('hamburger', false)
  const onToggle = () => toggle(!open)

  return (
    <ResponsiveContext.Consumer>
      {responsive => (
        <ThemedHeader
          background={'background-front'}
          open={open}
          height={`xsmall`}
          {...props}
        >
          <Box
            align={`center`}
            fill
            direction={`row`}
            justify={responsive === 'small' ? `between` : `start`}
            pad={{ horizontal: 'medium', vertical: 'small' }}
          >
            <Logo />
            <Nav open={open} onToggle={onToggle} theme={theme} />
          </Box>
        </ThemedHeader>
      )}
    </ResponsiveContext.Consumer>
  )
}

export default Header
