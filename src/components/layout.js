/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Box, Footer, Paragraph } from 'grommet'

import Header from './header'
import Link from './link'
import Main from './main'
import Switch from './switch'

import { StorageState } from '../hooks/storage'
import Theme from '../theme'

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

const Layout = ({ children }) => {
  const [theme, onChangeTheme] = StorageState('theme', 'light')

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Theme themeMode={theme}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Box pad={'medium'}>
        <Main>{children}</Main>
      </Box>
      <Footer background={'background-front'} pad={'medium'}>
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
      </Footer>
    </Theme>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
