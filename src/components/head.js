/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function Head({
  children,
  date,
  description,
  dir,
  lang,
  locale,
  meta,
  pathname,
  timeToRead,
  title
}) {
  const { logo, site } = useStaticQuery(
    graphql`
      query {
        logo: file(relativePath: { eq: "gatsby-icon.png" }) {
          publicURL
        }
        site: site {
          buildTime(formatString: "YYYY-MM-DD")
          siteMetadata {
            author
            description
            keywords
            social
            title
            url
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaTitle = title || site.siteMetadata.title

  const seo = {
    date: date || Date.now(),
    description: metaDescription.replace(/ {2}|\r\n|\n|\r/gm, ''),
    image: site.siteMetadata.image,
    keywords: site.siteMetadata.keywords,
    timeToRead: timeToRead ? `PT${timeToRead * 60}S` : 'PT300S',
    title: metaTitle,
    url: `${site.siteMetadata.url}/${pathname || ''}`
  }

  console.log(`SEO OBJECT: `, seo)

  return (
    <Helmet
      // defer={false}
      onChangeClientState={(newState, addedTags, removedTags) =>
        process.env.NODE_ENV === 'development' &&
        console.log(site.buildTime, newState, addedTags, removedTags)
      }
      htmlAttributes={{
        dir,
        lang
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `author`,
          content: site.siteMetadata.author
        },
        {
          name: `description`,
          content: metaDescription
        },
        {
          name: `image`,
          content: site.siteMetadata.url + logo.publicURL
        },
        {
          property: `image:height`,
          content: `512`
        },
        {
          property: `image:width`,
          content: `1024`
        },
        {
          name: `keywords`,
          content: site.siteMetadata.keywords
        },
        {
          name: `application-name`,
          content: site.siteMetadata.title
        },
        {
          name: `apple-mobile-web-app-title`,
          content: site.siteMetadata.title
        },
        {
          name: `apple-mobile-web-app-capable`,
          content: `yes`
        },
        {
          name: `apple-mobile-web-app-status-bar-style`,
          content: `black-translucent`
        },
        {
          property: `article:author`,
          content: site.siteMetadata.author
        },
        {
          property: `article:publisher`,
          content: site.siteMetadata.title
        },
        {
          property: `fb:app_id`,
          content: process.env.GATSBY_FACEBOOK_APP_ID
        },
        {
          property: `fb:pages`,
          content: process.env.GATSBY_FACEBOOK_PAGE_ID
        },
        {
          name: `msapplication-TileColor`,
          content: `#0a0a0a`
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          name: `og:image`,
          content: site.siteMetadata.url + logo.publicURL
        },
        {
          property: `og:image:height`,
          content: `512`
        },
        {
          property: `og:image:width`,
          content: `1024`
        },
        {
          name: `og:image:secure_url`,
          content: site.siteMetadata.url + logo.publicURL
        },
        {
          property: `og:locale`,
          content: locale
        },
        {
          property: `og:site_name`,
          content: site.siteMetadata.title
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          property: `og:url`,
          content: `${site.siteMetadata.url}/${pathname || ''}`
        },
        /* This is the default Referrer Policy */
        {
          name: `referrer`,
          content: `no-referrer-when-downgrade`
        },
        {
          property: `twitter:account_id`,
          content: process.env.GATSBY_TWITTER_PAGE_ID
        },
        {
          name: `twitter:app:id:ipad`,
          content: `1406939668`
        },
        {
          name: `twitter:app:id:iphone`,
          content: `1406939668`
        },
        {
          name: `twitter:app:id:googleplay`,
          content: `com.rozaroute.route`
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social
        },
        {
          name: `twitter:description`,
          content: metaDescription
        },
        {
          name: `twitter:image`,
          content: site.siteMetadata.url + logo.publicURL
        },
        {
          property: `twitter:image:height`,
          content: `512`
        },
        {
          property: `twitter:image:width`,
          content: `1024`
        },
        {
          name: `twitter:site`,
          content: site.siteMetadata.url
        },
        {
          name: `twitter:text:title`,
          content: title
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:url`,
          content: `${site.siteMetadata.url}/${pathname || ''}`
        }
      ].concat(meta)}
    >
      <link rel={'home'} href={'https://getroute.com/'} />
      {children}
    </Helmet>
  )
}

Head.defaultProps = {
  description: ``,
  dir: `ltr`,
  lang: `en`,
  locale: `en_US`,
  meta: []
}

Head.propTypes = {
  dir: PropTypes.string,
  description: PropTypes.string,
  lang: PropTypes.string,
  locale: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
}

export default Head
