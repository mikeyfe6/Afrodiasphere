/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)

const axios = require("axios")

const apiURL = process.env.GATSBY_BASE_URL

exports.createPages = async ({ actions: { createPage } }) => {
  const getPageInstanties = await axios.get(
    `${apiURL}/api/instanties?populate=*`
  )

  // ! OTHER PAGES
  // createPage({
  //   path: `/`,
  //   component: require.resolve("./src/templates/gebruiker.jsx"),
  //   context: { getPageInstanties },
  // })

  // ! EACH PAGE INSTANTIE
  getPageInstanties.data.forEach(({ slug, persoon, id }) => {
    createPage({
      path: `/${slug}`,
      component: path.resolve("./src/templates/pagina.jsx"),
      context: {
        slug: slug,
        persoon,
        id,
      },
    })
  })
}
