/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Footer from './footer'
import Header from './header'
import Main from './main'

import { StorageState } from '../hooks/storage'
import Theme from '../theme'

const Layout = ({ children }) => {
  const [theme, onChangeTheme] = StorageState('theme', Theme.themeMode)

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
      <Main>{children}</Main>
      <Footer theme={theme} onChangeTheme={onChangeTheme} />
    </Theme>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
