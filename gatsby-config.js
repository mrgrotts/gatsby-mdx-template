/*
 *  Get Access to .env
 */
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const path = require('path')

const manifest = require('./config/manifest')
const siteMetadata = require('./config/site')

module.exports = {
  siteMetadata,
  plugins: [
    /*
     *  MDX https://www.gatsbyjs.org/docs/mdx/
     */
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: { default: path.resolve('./src/components/layout.js') }
      }
    },

    /*
     * SEO Metadata
     */
    `gatsby-plugin-react-helmet`,

    /*
     *  Access to Filesystem
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`
      }
    },

    /*
     * Sharp Image Processing
     */
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    /*
     * Website Manifest
     */
    {
      resolve: `gatsby-plugin-manifest`,
      options: manifest
    },

    /*
     *  Generate a Sitemap.
     */
    `gatsby-plugin-sitemap`,

    /*
     *  Robots.txt Support.
     */
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        configFile: `${__dirname}/config/robots.txt.js`
      }
    },

    /*
     *  Styled Components
     */
    `gatsby-plugin-styled-components`,

    /*
     * Google Marketing Platform (Analytics, Optimize, Tag Manager)
     */
    {
      resolve: 'gatsby-plugin-google-marketing-platform',
      options: {
        includeInDevelopment: true,
        dataLayer: {
          // Preset dataLayer values
          gaPropertyId: process.env.GATSBY_GOOGLE_ANALYTICS_ID
        },
        analytics: {
          id: process.env.GATSBY_GOOGLE_ANALYTICS_ID
        },
        optimize: {
          id: process.env.GATSBY_GOOGLE_OPTIMIZE_ID
        },
        tagmanager: {
          id: process.env.GATSBY_GOOGLE_TAG_MANAGER_ID,
          params: {
            // GTM URL Parameters
            // Ex: https://www.googletagmanager.com/gtm.js?id=[ID]&gtm_cookies_win=x
            gtm_cookies_win: 'x'
          }
        }
      }
    },

    /*
     *  Webpack Bundle Size
     */
    {
      resolve: `gatsby-plugin-webpack-size`,
      options: {
        development: true
      }
    },

    /*
     * Service Worker
     */
    // `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        navigateFallbackWhitelist: [/\/$/]
      }
    }
  ]
}
