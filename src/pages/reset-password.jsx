import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"

import Seo from "../components/seo"

import {
  docsHead,
  bgPrimary,
  py3,
  container,
  grid,
  md,
  lead,
  // resetImg,
} from "../styles/modules/resetStyles.module.scss"

// import servImage from "../images/mamafrica.png"

import ResetPassword from "../components/resetpwd"

const IndexPage = () => (
  <Layout>
    <Seo title="Reset wachtwoord" />
    <section className={`${docsHead} ${bgPrimary} ${py3}`}>
      <div className={`${container} ${grid}`}>
        <div>
          <h1 className={md}>Nieuw wachtwoord</h1>
          <p
            className={lead}
            style={{ color: "#cc9932", fontSize: "0.8em", margin: "0 0 1em" }}
          >
            Voer hieronder jouw verificatiecode en een nieuwe wachtwoord in
          </p>
          <ResetPassword />
        </div>
        {/* <img src={servImage} alt="" className={resetImg} /> */}
      </div>
    </section>
  </Layout>
)

export default IndexPage
