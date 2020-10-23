/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const path = require(`path`)

module.exports = {
  /* Your site config here */
  pathPrefix: "/svhps2020web",
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Southwater village preschools website",
        short_name: "SVPS",
        start_url: "/",
        background_color: "#eff0f3",
        theme_color: "#eff0f3",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/icon.svg", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
        // cache_busting_mode: "none",
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/about/*`, `/contact/`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: path.join(__dirname, `src`, `pages`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `homePage`,
        path: path.join(__dirname, `src`, `editable-content`, `home`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `aboutPage`,
        path: path.join(__dirname, `src`, `editable-content`, `about`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contactPage`,
        path: path.join(__dirname, `src`, `editable-content`, `contact`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `newsPage`,
        path: path.join(__dirname, `src`, `editable-content`, `news`),
      },
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 800,
            },
          },
        ],
      },
    },
  ],
}
