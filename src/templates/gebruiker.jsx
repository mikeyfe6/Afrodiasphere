// import React from "react"
// import Reactmarkdown from "react-markdown"
// import { Link, graphql } from "gatsby"
// import Layout from "../components/layout"

// const UserTemplate = ({ data }) => (
//   <Layout>
//     <h1>{data.strapiUser.username}</h1>
//     <ul>
//       {data.strapiUser.gebruiker.map(effe => (
//         <li key={effe.id}>
//           <h2>
//             <Link to={`/Instantie_${effe.id}`}>{effe.profiel}</Link>
//           </h2>
//           <Reactmarkdown source={effe.biografie} />
//         </li>
//       ))}
//     </ul>
//   </Layout>
// )

// export default UserTemplate

// export const query = graphql`
//   query UserTemplate($id: String!) {
//     strapiUser(id: { eq: $id }) {
//       id
//       username
//       gebruiker {
//         id
//         profiel
//         biografie
//       }
//     }
//   }
// `
