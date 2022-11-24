import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"

import {
  docsHead,
  bgPrimary,
  py3,
  container,
  grid,
  md,
  lead,
  // forgetImg,
} from "../styles/modules/forgetStyles.module.scss"

// import servImage from "../images/mamafrica.png"

import ForgetPassword from "../components/forgetpwd"

const IndexPage = () => (
  <Layout>
    <section className={`${docsHead} ${bgPrimary} ${py3}`}>
      <div className={`${container} ${grid}`}>
        <div>
          <h1 className={md}>Wachtwoord vergeten</h1>
          <p
            className={lead}
            style={{ color: "#cc9932", fontSize: "0.8em", margin: "0 0 1em" }}
          >
            Voer hieronder jouw e-mailadres in & je ontvangt een e-mail met
            daarin de verificatiecode voor het resetten van jouw wachtwoord
          </p>
          <ForgetPassword />
        </div>
        {/* <img src={servImage} alt="" className={forgetImg} /> */}
      </div>
    </section>
  </Layout>
)

export default IndexPage

export const Head = () => {
  return <SEO title="Wachtwoord vergeten" />
}
