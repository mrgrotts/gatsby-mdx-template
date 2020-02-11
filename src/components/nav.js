import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Box, DropButton, Menu, ResponsiveContext } from 'grommet'
import styled from 'styled-components'

import Link from './link'

const HamburgerIcon = styled(Box)`
  bottom: 16px;
  cursor: pointer;
  position: relative;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  width: 36px;

  span {
    background: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#0a0a0a')};
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

const Hamburger = ({ open, onClick, theme }) => (
  <HamburgerIcon open={open} onClick={onClick} theme={theme}>
    <span></span>
    <span></span>
    <span></span>
  </HamburgerIcon>
)

const NavMenu = props => {
  const {
    site: {
      siteMetadata: { siteMenu }
    }
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteMenu {
              label
              link
              submenu {
                label
                link
              }
            }
          }
        }
      }
    `
  )

  return siteMenu.map(({ label, link, submenu }) => {
    if (submenu && submenu.length) {
      const links = submenu.map(item => ({
        as: Link,
        label: item.label,
        to: item.link
      }))

      return (
        <Menu
          key={link}
          dropAlign={{ right: 'right', top: 'top' }}
          label={label}
          items={links}
          style={{ color: '#0061e4' }}
        />
      )
    }

    return (
      <Link key={link} to={link} label={label} margin="small" size="medium" />
    )
  })
}

const Nav = ({ open, onToggle, theme }) => (
  <ResponsiveContext.Consumer>
    {responsive => (
      <Box as={`nav`}>
        {responsive === 'small' ? (
          <DropButton
            dropAlign={{ right: 'right', top: 'bottom' }}
            dropContent={
              <Box
                background={'background-front'}
                style={{ height: '100vh', width: '100vw' }}
              >
                <NavMenu />
              </Box>
            }
            justifyContent={'center'}
            label={<Hamburger open={open} onClick={onToggle} theme={theme} />}
            open={open}
            onClose={onToggle}
            onOpen={onToggle}
            style={{ alignItems: 'center', display: 'flex', height: '100%' }}
          />
        ) : (
          <Box
            margin={{ left: 'small' }}
            round="xsmall"
            direction="row"
            align="center"
            pad={{ horizontal: 'small' }}
          >
            <NavMenu />
          </Box>
        )}
      </Box>
    )}
  </ResponsiveContext.Consumer>
)

export default Nav
