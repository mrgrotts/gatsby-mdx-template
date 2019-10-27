import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import { Header as ThemeHeader, Typography } from '../theme'

const Header = ({ siteTitle }) => (
  <ThemeHeader>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`
      }}
    >
      <Typography type={`h1`}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
        >
          {siteTitle}
        </Link>
      </Typography>
    </div>
  </ThemeHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
