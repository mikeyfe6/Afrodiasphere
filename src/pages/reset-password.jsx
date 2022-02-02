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
} from "../styles/modules/loginStyles.module.scss"

import { indexBg } from "../styles/modules/resetStyles.module.scss"

import servImage from "../images/server.png"

import ResetPassword from "../components/resetpwd"

const IndexPage = () => (
  <Layout>
    <Seo title="Nieuw wachtwoord" />
    <section className={`${docsHead} ${bgPrimary} ${py3}`}>
      <div className={`${container} ${grid}`}>
        <div>
          <h1 className={md}>Nieuw wachtwoord</h1>
          <p className={lead}>Voer hier je nieuwe wachtwoord in</p>
          <ResetPassword />
        </div>
        <img src={servImage} alt="" />
      </div>
    </section>
    <div className={indexBg} />
  </Layout>
)

export default IndexPage
