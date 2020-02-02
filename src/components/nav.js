import React from 'react'
import { Anchor, Box, DropButton, ResponsiveContext } from 'grommet'
import styled from 'styled-components'

const HamburgerIcon = styled(Box)`
  bottom: 16px;
  cursor: pointer;
  position: relative;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  width: 36px;

  span {
    background: #0a0a0a;
    border-radius: 8px;
    display: block;
    height: 4px;
    left: 0;
    opacity: 1;
    position: absolute;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
    width: 100%;
  }

  span:nth-child(1) {
    top: ${props => (props.open ? '12px' : '0px')};
    transform: ${props => props.open && 'rotate(135deg)'};
  }

  span:nth-child(2) {
    left: ${props => props.open && '-60px'};
    opacity: ${props => props.open && '0'};
    top: 12px;
  }

  span:nth-child(3) {
    top: ${props => (props.open ? '12px' : '24px')};
    transform: ${props => props.open && 'rotate(-135deg)'};
  }
`

const Hamburger = ({ open, onClick }) => (
  <HamburgerIcon open={open} onClick={onClick}>
    <span></span>
    <span></span>
    <span></span>
  </HamburgerIcon>
)

const Nav = ({ open, onToggle }) => (
  <ResponsiveContext.Consumer>
    {responsive =>
      responsive === 'small' ? (
        <DropButton
          dropAlign={{ right: 'right', top: 'bottom' }}
          dropContent={
            <Box
              background={'background-front'}
              style={{ height: '100vh', width: '100vw' }}
            >
              <Anchor href="" label="Activity" margin="small" size="small" />
              <Anchor href="" label="Utilization" margin="small" size="small" />
              <Anchor
                href=""
                label="Virtual Machines"
                margin="small"
                size="small"
              />
            </Box>
          }
          justifyContent={'center'}
          label={<Hamburger open={open} onClick={onToggle} />}
          open={open}
          onClose={onToggle}
          onOpen={onToggle}
          style={{ alignItems: 'center', display: 'flex', height: '100%' }}
        />
      ) : (
        <Box
          margin={{ left: 'small' }}
          round="xsmall"
          background={{ color: 'white', opacity: 'weak' }}
          direction="row"
          align="center"
          pad={{ horizontal: 'small' }}
        >
          <Anchor href="" label="Activity" margin="small" />
          <Anchor href="" label="Utilization" margin="small" />
          <Anchor href="" label="Virtual Machines" margin="small" />
        </Box>
      )
    }
  </ResponsiveContext.Consumer>
)

export default Nav
