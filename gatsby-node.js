/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for article nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        return result
      })
    )
  })

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const getInstanties = makeRequest(
    graphql,
    `
    {
        instantie {
          instanties {
            data {
              attributes {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    // Create pages for each article.
    result.data.instantie.instanties.data.forEach(({ attributes }) => {
      createPage({
        path: `/${attributes.slug}`,
        component: path.resolve(`src/templates/pagina.jsx`),
        context: {
          slug: attributes.slug,
        },
      })
    })
  })

  // const getGebruiker = makeRequest(
  //   graphql,
  //   `
  //   {
  //     allStrapiUser {
  //       edges {
  //         node {
  //           id
  //         }
  //       }
  //     }
  //   }
  //   `
  // ).then(result => {
  //   // Create pages for each user.
  //   result.data.allStrapiUser.edges.forEach(({ node }) => {
  //     createPage({
  //       path: `/gebruiker/${node.id}`,
  //       component: path.resolve(`src/templates/gebruiker.jsx`),
  //       context: {
  //         id: node.id,
  //       },
  //     })
  //   })
  // }) , getGebruiker | hier beneden toevoegen bij Promise.all

  // Queries for articles and authors nodes to use in creating pages.
  return Promise.all([getInstanties])
}
