import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"

import Seo from "../components/seo"

import {
  indexBg,
  docsHead,
  bgPrimary,
  py3,
  container,
  grid,
  md,
  lead,
  forgetImg,
} from "../styles/modules/forgetStyles.module.scss"

import servImage from "../images/server.png"

import ForgetPassword from "../components/forgetpwd"

const IndexPage = () => (
  <Layout>
    <Seo title="Wachtwoord vergeten" />
    <section className={`${docsHead} ${bgPrimary} ${py3}`}>
      <div className={`${container} ${grid}`}>
        <div style={{ textAlign: "left" }}>
          <h1 className={md}>Wachtwoord vergeten</h1>
          <p className={lead}>Voer hier je emailadress in</p>
          <ForgetPassword />
        </div>
        <img src={servImage} alt="" className={forgetImg} />
      </div>
    </section>
    <div className={indexBg} />
  </Layout>
)

export default IndexPage
