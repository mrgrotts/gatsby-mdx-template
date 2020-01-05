import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading } from 'grommet'

import Link from './link'

const Header = ({ siteTitle }) => (
  <header style={{ backgroundColor: 'purple' }}>
    <Box>
      <Heading level={`1`}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
        >
          {siteTitle}
        </Link>
      </Heading>
    </Box>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
