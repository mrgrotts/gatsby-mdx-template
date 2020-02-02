/*
 *  Get Access to .env
 */
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const path = require('path')

const manifest = require('./config/manifest')
const siteMetadata = require('./config/siteMetadata')

const formatNewLines = string => string.replace(new RegExp('\\\\n', 'g'), '\n')
const dynamicPlugins = []
if (
  process.env.NODE_ENV === 'production' &&
  process.env.GATSBY_GOOGLE_SA_CLIENT_EMAIL &&
  process.env.GATSBY_GOOGLE_SA_PRIVATE_KEY &&
  process.env.GATSBY_GOOGLE_ANALYTICS_VIEW_ID
) {
  dynamicPlugins.push(
    /* AI Fueled, GA Using Performance Optimizer */
    {
      resolve: 'gatsby-plugin-guess-js',
      options: {
        // Find the view id in the GA admin in a section labeled "views"
        GAViewID: process.env.GATSBY_GOOGLE_ANALYTICS_VIEW_ID,
        jwt: {
          // keyFileName: './config/route-website-sa.json'
          client_email: process.env.GATSBY_GOOGLE_SA_CLIENT_EMAIL,
          private_key: formatNewLines(process.env.GATSBY_GOOGLE_SA_PRIVATE_KEY)
        },
        minimumThreshold: 0.03,
        // The "period" for fetching analytics data.
        period: {
          startDate: new Date(`12/1/2018`),
          endDate: new Date()
        }
      }
    }
  )
}

module.exports = {
  siteMetadata,
  pathPrefix: '/',
  plugins: [
    /*
     *  MDX https://www.gatsbyjs.org/docs/mdx/
     */
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: { default: path.resolve('./src/components/layout.js') },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1080,
              // linkImagesToOriginal: false,
              linkImagesToOriginal: true,
              sizeByPixelDensity: true,
              tableOfContents: {
                heading: null,
                maxDepth: 2
              }
            }
          }
        ]
      }
    },

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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`
      }
    },

    /*
     * Sharp Image Processing
     */
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    /*
     *  Intercepts local links from markdown and other non-react pages and
     *  does a client-side pushState to avoid the browser having to refresh the page.
     */
    `gatsby-plugin-catch-links`,

    /*
     *  Remove trailing slashes from paths generated by Gatsby
     */
    `gatsby-plugin-remove-trailing-slashes`,

    /*
     * SEO Metadata
     */
    `gatsby-plugin-react-helmet`,

    /*
     *  Informs Search Engines What URLs We Prefer to Index.
     */
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        noTrailingSlash: true,
        siteUrl: siteMetadata.siteUrl
      }
    },

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
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        createLinkInHead: true,
        exclude: ['/resources/route-nation/tags/*'],
        output: `/sitemap.xml`,
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }

          allSitePage {
            edges {
              node {
                path
              }
            }
          }
        }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => ({
            url: site.siteMetadata.siteUrl + edge.node.path,
            changefreq: `daily`,
            priority: 0.7
          }))
      }
    },

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
     * Facebook Pixel
     */
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: process.env.GATSBY_FACEBOOK_PIXEL
      }
    },

    /*
     * RSS Feed
     */
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
                  {
                    site {
                      siteMetadata {
                        title
                        description
                        siteUrl
                        site_url: siteUrl
                      }
                    }
                  }
                `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) =>
              allMdx.edges.map(({ node }) => ({
                ...node.frontmatter,
                description: node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ 'content:encoded': node.html }]
              })),
            query: `
                      {
                        allMdx(
                          sort: { order: DESC, fields: [frontmatter___date] },
                        ) {
                          edges {
                            node {
                              excerpt
                              html
                              fields { 
                                slug 
                              }
                              frontmatter {
                                title
                                date
                              }
                            }
                          }
                        }
                      }
                    `,
            output: '/rss.xml',
            title: 'Route Nation RSS',
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/resources/route-nation/'
          }
        ]
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
    },

    /*
     * Netlify Header and Redirect Files
     */
    // `gatsby-plugin-netlify`
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        cachePublic: true,
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
        mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
        mergeCachingHeaders: true, // boolean to turn off the default caching headers
        transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
        generateMatchPathRewrites: true // boolean to turn off automatic creation of redirect rules for client only paths
      }
    }
  ].concat(dynamicPlugins)
}
