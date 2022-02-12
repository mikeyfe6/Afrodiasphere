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
  forgetImg,
} from "../styles/modules/forgetStyles.module.scss"

import servImage from "../images/mamafrica.png"

import ForgetPassword from "../components/forgetpwd"

const IndexPage = () => (
  <Layout>
    <Seo title="Wachtwoord vergeten" />
    <section className={`${docsHead} ${bgPrimary} ${py3}`}>
      <div className={`${container} ${grid}`}>
        <div>
          <h1 className={md}>Wachtwoord vergeten</h1>
          <p className={lead} style={{ color: "#cc9932" }}>
            Voer hier je emailadress in
          </p>
          <ForgetPassword />
        </div>
        <img src={servImage} alt="" className={forgetImg} />
      </div>
    </section>
  </Layout>
)

export default IndexPage
