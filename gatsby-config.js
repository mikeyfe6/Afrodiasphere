const { ApolloLink, createHttpLink } = require(`@apollo/client`)
const { RetryLink } = require(`@apollo/client/link/retry`)
const fetch = require(`cross-fetch`)

const retryLink = new RetryLink({
  delay: {
    initial: 100,
    max: 2000,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error, operation) =>
      Boolean(error) && ![500, 400].includes(error.statusCode),
  },
})

require("dotenv").config({
  // path: `.env.${process.env.NODE_ENV}`,
  path: ".env",
})

module.exports = {
  siteMetadata: {
    siteUrl: `https://afrodiasphere.netlify.app`,
    title: `Afrodiasphere`,
    author: "Michael Fransman",
    description: `Een efficiente oplossing voor het delen van contactinformatie`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: `gatsby-source-strapi`,
    //   options: {
    //     apiURL: process.env.DEPLOY_URL
    //       ? "https://afrodiasphere-backend.herokuapp.com"
    //       : "http://localhost:1337",
    //     collectionTypes: [
    //       {
    //         name: `instantie`,
    //         endpoint: "api/instanties",
    //       }, //Repeat for each of your collection types
    //       // {
    //       //   name: `user`,
    //       //   endpoint: "users",
    //       // }, //Repeat for each of your collection types
    //     ],
    //     markdownImages: {
    //       typesToParse: {
    //         instantie: ["biografie"],
    //       },
    //     },
    //     queryLimit: 1000,
    //     loginData: {
    //       identifier: "",
    //       password: "",
    //     },
    //   },
    // },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "INSTANTIE",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "instantie",
        // Url to query from
        url: `${process.env.GATSBY_BASE_URL}/graphql`,
        createLink: pluginOptions =>
          ApolloLink.from([
            retryLink,
            createHttpLink({ uri: pluginOptions.url, fetch }),
          ]),
      },
    },

    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/admin/*`] },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `white`,
        // Disable the loading spinner.
        // showSpinner: false,
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Afrodiasphere`,
        short_name: `Afrodiasphere`,
        description: `Een veilige en duurzame oplossing voor het delen van contactinformatie, ook op anderhalve meter afstand.`,
        start_url: `/`,
        background_color: `#a9a9a9`,
        lang: `nl`,
        theme_color: `#16b7f2`,
        display: `standalone`,
        icon: "src/images/afroadiaspheretest.png",
        icon_options: {
          purpose: `any maskable`,
        },
        crossOrigin: `use-credentials`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
