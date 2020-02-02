import React from 'react'
import { Box, Footer as GrommetFooter, Paragraph } from 'grommet'

import Link from './link'
import Switch from './switch'

import setTheme from '../theme/setTheme'

const Footer = ({ theme, onChangeTheme, ...props }) => (
  <GrommetFooter background={'background-front'} pad={'medium'} {...props}>
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

export default Footer
