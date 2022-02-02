import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

import Seo from "../components/seo"

import {
  docsHead,
  bgPrimary,
  py3,
  container,
  grid,
  xl,
  lead,
  btn,
  indexBg,
} from "../styles/modules/loginStyles.module.scss"

import servImage from "../images/server.png"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <section className={`${docsHead} ${bgPrimary} ${py3}`}>
      <div className={`${container} ${grid}`}>
        <div>
          <h1 className={xl}>Afrodiasphere</h1>
          <p className={lead}>
            Klik{" "}
            <Link to="/admin/login">
              <button
                className={`${btn}`}
                type="button"
                style={{
                  padding: "3.5px 20px 2.5px 20px",
                  float: "none",
                  color: "black",
                  backgroundColor: "#e6541b",
                }}
              >
                hier
              </button>
            </Link>{" "}
            om in te loggen..
          </p>
        </div>
        <img src={servImage} alt="" />
      </div>
    </section>
    <div className={indexBg} />
  </Layout>
)

export default IndexPage
