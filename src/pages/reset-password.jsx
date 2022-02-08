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
  resetImg,
} from "../styles/modules/resetStyles.module.scss"

import servImage from "../images/server.png"

import ResetPassword from "../components/resetpwd"

const IndexPage = () => (
  <Layout>
    <Seo title="Reset wachtwoord" />
    <section className={`${docsHead} ${bgPrimary} ${py3}`}>
      <div className={`${container} ${grid}`}>
        <div style={{ textAlign: "left" }}>
          <h1 className={md}>Nieuw wachtwoord</h1>
          <p className={lead}>Voer hier je nieuwe wachtwoord in</p>
          <ResetPassword />
        </div>
        <img src={servImage} alt="" className={resetImg} />
      </div>
    </section>
    <div className={indexBg} />
  </Layout>
)

export default IndexPage
