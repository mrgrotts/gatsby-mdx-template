import React from 'react'
import { Box, Footer as GrommetFooter, Paragraph } from 'grommet'

import Link from './link'
import Switch from './switch'

const Footer = ({ theme, onChangeTheme }) => {
  function setTheme(theme, callback) {
    if (theme) {
      console.log('current theme: ', theme)
      /* Grommet's default theme is the Light theme */
      if (theme === 'dark') {
        console.log('selected light theme')
        return callback('light')
        /* Grommet's dark theme is the Dark theme */
      } else if (theme === 'light') {
        console.log('selected dark theme')
        return callback('dark')
      } else {
        return callback('light')
      }
    } else {
      return callback('light')
    }
  }

  return (
    <GrommetFooter background={'background-front'} pad={'medium'}>
      <Box direction={'row'}>
        <Paragraph color={'text'}>
          © {new Date().getFullYear()}, Built with{' '}
          <Link to="https://www.gatsbyjs.org">Gatsby</Link>
        </Paragraph>
      </Box>
      <Switch
        color={'brand'}
        label={'Switch Theme'}
        onClick={() => setTheme(theme, onChangeTheme)}
        primary
      />
    </GrommetFooter>
  )
}

export default Footer
