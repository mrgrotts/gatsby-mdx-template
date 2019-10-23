const { description, dir, lang, title, theme } = require('./defaults')

module.exports = {
  background_color: `#663399`,
  categories: `business, productivity`,
  description,
  dir,
  /* 
   * Enables "Add to Homescreen" prompt and disables browser UI (including back button)
   * see https://developers.google.com/web/fundamentals/web-app-manifest/#display
   * 
   display: `standalone`,
  */
  display: `browser`,
  icon: `src/assets/gatsby-icon.png`, // This path is relative to the root of the site.
  lang,
  name: title,
  /*
   * NOTE: crossOrigin has not been tested.
   */
  // crossOrigin: `use-credentials`,
  orientation: `portrait`,
  related_applications: [
    {
      platform: 'play',
      url: `https://play.google.com/store/apps/details?id=com.rozaroute.route&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1`
    },
    {
      platform: 'itunes',
      url: `https://itunes.apple.com/us/app/route-the-service-platform/id1406939668?ls=1&mt=8`
    }
  ],
  // screenshots : [ { "src": "screenshot.webp", "sizes": "1280x720", "type": "image/webp" } ],
  serviceworker: { src: './sw.js' },
  short_name: `MDX Template`,
  start_url: `/`,
  theme_color: theme
}
