import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Link from './link'

const BrandTitle = styled(Link)`
  font-size: 1.75rem;
`

const Logo = props => {
  const {
    site: {
      siteMetadata: { title }
    }
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return <BrandTitle to={'/'}>{title}</BrandTitle>
}

export default Logo
