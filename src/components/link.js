import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import PropTypes from 'prop-types'

// reused from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-google-analytics/src/index.js
function OutboundLink(props) {
  return (
    <a
      {...props}
      onClick={e => {
        if (typeof props.onClick === `function`) {
          props.onClick(e)
        }
        let redirect = true
        if (
          e.button !== 0 ||
          e.altKey ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey ||
          e.defaultPrevented
        ) {
          redirect = false
        }
        if (props.target && props.target.toLowerCase() !== `_self`) {
          redirect = false
        }
        if (window.ga) {
          window.ga(`send`, `event`, {
            eventCategory: `Outbound Link`,
            eventAction: `click`,
            eventLabel: props.href,
            transport: redirect ? `beacon` : ``,
            hitCallback: function() {
              if (redirect) {
                document.location = props.href
              }
            }
          })
        } else {
          if (redirect) {
            document.location = props.href
          }
        }

        return false
      }}
    />
  )
}

OutboundLink.propTypes = {
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func
}

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to)
  const file = /\.[0-9a-z]+$/i.test(to)

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    if (file) {
      return (
        <a href={to} {...other}>
          {children}
        </a>
      )
    }

    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    )
  }
  return (
    <OutboundLink href={to} {...other}>
      {children}
    </OutboundLink>
  )
}

export default Link
