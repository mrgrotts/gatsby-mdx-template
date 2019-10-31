const { description, dir, lang, title, theme } = require('./defaults')

module.exports = {
  author: `JG`,
  description,
  dir,
  keywords: `gatsby, mdx, template, website`,
  lang,
  menuLinks: [
    {
      name: 'Page 2',
      link: '/page-2'
      //   submenu: []
    }
  ],
  siteUrl: `https://getroute.com`,
  social: `@mrgrotts`,
  title,
  theme
}
