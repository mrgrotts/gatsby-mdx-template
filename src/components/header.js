import React from 'react'
import PropTypes from 'prop-types'
import { Box, Header as GrommetHeader, Heading } from 'grommet'

import Link from './link'

const Header = ({ siteTitle }) => (
  <GrommetHeader background={'background-front'}>
    <Box>
      <Heading color={'text-strong'} level={`1`}>
        <Link to={'/'}>{siteTitle}</Link>
      </Heading>
    </Box>
  </GrommetHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
