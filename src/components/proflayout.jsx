/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"

const ProfLayout = ({ children }) => {
  //   const data = useStaticQuery(graphql`
  //     query SiteTitleQuery {
  //       site {
  //         siteMetadata {
  //           title
  //         }
  //       }
  //     }
  //   `)

  return (
    <>
      <div style={{ height: "100vh", marginBottom: "-58px" }}>
        <main>{children}</main>
      </div>
    </>
  )
}

ProfLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProfLayout
