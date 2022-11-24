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
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-PRN53H8",
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     // Arbitrary name for the remote schema Query type
    //     typeName: "INSTANTIE",
    //     // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
    //     fieldName: "instantie",
    //     // Url to query from
    //     url: `${process.env.GATSBY_BASE_URL}/graphql`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
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
    // `gatsby-plugin-netlify`,
    {
      resolve: "gatsby-plugin-netlify",
      options: {
        headers: {
          "/*": [
            "X-XSS-Protection: 1; mode=block",
            "X-Content-Type-Options: nosniff",
            "Referrer-Policy: same-origin",
            `Content-Security-Policy: frame-ancestors 'self' http://techsini.com`,
          ],
        },
      },
    },
    // `gatsby-plugin-image`,
    // `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        // Defaults used for gatsbyImageData and StaticImage
        defaults: {
          placeholder: "blurred",
          formats: ["auto", "webp", "avif", "png"],
          quality: 100,
        },
        // Set to false to allow builds to continue on image errors
        failOnError: true,
        // deprecated options and their defaults:
        base64Width: 20,
        forceBase64Format: `webp`, // valid formats: png,jpg,webp
        useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
        stripMetadata: true,
        defaultQuality: 100,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/, // See below to configure properly
        },
      },
    },
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
        theme_color: `#cc9932`,
        display: `standalone`,
        icon: "src/images/afrodiasphere-logo.png",
        // icon_options: {
        //   purpose: `any maskable`,
        // },
        crossOrigin: `use-credentials`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
