import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import PropTypes from 'prop-types'
import { Anchor } from 'grommet'

// reused from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-google-analytics/src/index.js
const OutboundLink = (
  { action, category, children, color, href, target },
  ...props
) => {
  const onClick = event => {
    if (typeof props.onClick === `function`) {
      props.onClick(event)
    }

    let redirect = true

    if (
      event.button !== 0 ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.defaultPrevented
    ) {
      redirect = false
    }

    if (target && target.toLowerCase() !== `_self`) {
      redirect = false
    }

    if (window.ga) {
      window.ga(`send`, `event`, {
        eventCategory: category || `Outbound Link`,
        eventAction: action || `click`,
        eventLabel: href,
        transport: redirect ? `beacon` : ``,
        hitCallback: () => {
          if (redirect) {
            document.location = href
          }
        }
      })
    } else {
      if (redirect) {
        document.location = href
      }
    }

    return false
  }

  return (
    <Anchor href={href} color={color} onClick={onClick} {...props}>
      {children}
    </Anchor>
  )
}

OutboundLink.propTypes = {
  action: PropTypes.string,
  category: PropTypes.string,
  color: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func
}

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = ({
  children,
  color,
  href,
  to,
  activeClassName,
  partiallyActive,
  ...other
}) => {
  if (!color) {
    color = `brand`
  }

  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to)

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    const file = /\.[0-9a-z]+$/i.test(to)

    if (file) {
      return (
        <Anchor href={to} color={color} {...other}>
          {children}
        </Anchor>
      )
    }

    return (
      <GatsbyLink
        to={to || href}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
      >
        <Anchor as={'span'} color={color} {...other}>
          {children}
        </Anchor>
      </GatsbyLink>
    )
  }
  return (
    <OutboundLink href={to} color={color} {...other}>
      {children}
    </OutboundLink>
  )
}

Link.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
  to: PropTypes.string,
  activeClassName: PropTypes.string,
  partiallyActive: PropTypes.bool
}

export default Link
