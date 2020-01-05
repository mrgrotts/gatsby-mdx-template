/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'
import { Box, Button, Footer, Paragraph, Grommet } from 'grommet'

import Header from './header'

import { StorageState } from '../hooks/storage'
import { Main } from '../theme/Main'
import Theme from '../theme/Theme'

const GlobalStyle = createGlobalStyle`
  img {
    max-width: 100%;
  }

  body {
    margin: 0;
  }

  a:active, a:focus, a:hover {
    opacity: 0.9;
  }
`

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
    <Grommet theme={Theme} themeMode={theme}>
      <GlobalStyle />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Box pad={'medium'}>
        <Main>{children}</Main>
      </Box>
      <Footer background={'background-front'} pad={'medium'}>
        <Box direction={'row'}>
          <Paragraph color={'text'}>
            © {new Date().getFullYear()}, Built with{' '}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </Paragraph>
        </Box>

        <Button
          color={'brand'}
          label={'Switch Theme'}
          onClick={() => setTheme(theme, onChangeTheme)}
          primary
        />
      </Footer>
    </Grommet>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string
}

export default Layout
