// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: 'Afrodiasphere',
    description: 'Webapp that locates melanated businesses worldwide!',
    titleTemplate: '%s · Afrodiasphere',
    image: '/afroadiaspheretest.png',
    lang: 'nl',
    siteUrl: 'https://afrodiasphere.nl',
    url: 'https://afrodiasphere.nl',
    author: 'Michael Fransman',
    twitterUsername: '@Afrodiasphere',
    bizEmail: 'info@menefex.nl',
    authorEmail: 'michaelfransman@menefex.nl',
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        host: process.env.CONTENTFUL_HOST,
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    'gatsby-plugin-sass',
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    'gatsby-plugin-eslint',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-catch-links`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/afroadiaspheretest.png',
      },
    },
    `gatsby-plugin-offline`,
  ],
};
