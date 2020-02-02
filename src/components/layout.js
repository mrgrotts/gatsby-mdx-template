/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'grommet'

import Footer from './footer'
import Header from './header'
import Main from './main'

import { StorageState } from '../hooks/storage'
import Theme from '../theme'

const Layout = ({ children }) => {
  const [theme, onChangeTheme] = StorageState(
    'theme',
    Theme.themeMode || 'light'
  )

  return (
    <Theme themeMode={theme}>
      <Grid
        areas={[
          { name: 'header', start: [0, 0], end: [0, 0] },
          { name: 'main', start: [0, 1], end: [0, 1] },
          { name: 'footer', start: [0, 2], end: [0, 2] }
        ]}
        columns={['full']}
        gap={'small'}
        rows={['xsmall', 'flex', 'xsmall']}
        style={{ minHeight: '100%' }}
      >
        <Header gridArea={'header'} />
        <Main fill gap={'medium'} gridArea={'main'} pad={'medium'}>
          {children}
        </Main>
        <Footer
          gridArea={'footer'}
          theme={theme}
          onChangeTheme={onChangeTheme}
        />
      </Grid>
    </Theme>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
