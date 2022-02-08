import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import axios from "axios"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
// import { Carousel } from "react-bootstrap"

import Layout from "../components/layout"

import Seo from "../components/seo"

import {
  carouselCont,
  carouselRow,
  homeAdsBio,
  imgHide,
  xl,
  docsHead,
  bgPrimary,
  py3,
  container,
  grid,
  lead,
  btn,
  card,
} from "../styles/modules/indexStyles.module.scss"

import { imgavatar } from "../styles/modules/profStyles.module.scss"

import servImage from "../images/server.png"

import noavatar from "../images/noavatar.png"

const apiURL = process.env.GATSBY_BASE_URL

const IndexPage = () => {
  const [carousel, setCarousel] = useState([])
  // const [time, setTime] = useState("")

  useEffect(() => {
    const getCarousel = async () => {
      const res = await axios.get(`${apiURL}/api/instanties?populate=*`)
      setCarousel(res.data)
    }
    getCarousel()
  }, [])

  return (
    <Layout>
      <Seo title="Home" />
      <section className={`${docsHead} ${bgPrimary} ${py3}`}>
        <div className={`${container} ${grid}`}>
          <div style={{ textAlign: "left" }}>
            <h1 className={xl}>Afrodiasphere</h1>
            <p className={lead}>
              <small style={{ color: "grey" }}>JOIN THE MOVEMENT !</small>{" "}
              <br /> Klik{" "}
              <Link to="/admin/login">
                <button
                  className={`${btn}`}
                  type="button"
                  style={{
                    padding: "3.5px 20px 2.5px 20px",
                    float: "none",
                    color: "black",
                    backgroundColor: "#cc9932",
                  }}
                >
                  hier
                </button>
              </Link>{" "}
              om in te loggen..
            </p>
          </div>
          <img src={servImage} alt="" className={imgHide} />

          <ul className={`${carouselCont} ${card}`}>
            {carousel.map(ads => (
              <li
                key={ads.id}
                // className={`theme-${color}-links`}
                className={carouselRow}
              >
                <img
                  src={!ads.avatar?.url ? noavatar : ads.avatar?.url}
                  className={imgavatar}
                  style={{
                    transform: "scale(0.7)",
                    border: "5px solid white",
                    maxWidth: "200px",
                    minWidth: "50px",
                  }}
                  alt="avatar"
                />

                <br />
                <div className={lead} style={{ color: "white" }}>
                  {ads.profiel}
                </div>
                <br />
                <ReactMarkdown
                  className={homeAdsBio}
                  children={ads.biografie}
                  remarkPlugins={[remarkGfm]}
                  // escapeHtml={false}
                />
                <br />

                <br />
                {/* {ads.createdAt} */}
                <br />

                <div>
                  {" "}
                  <Link to={`/${ads.slug}`} style={{ color: "black" }}>
                    ✨../{`${ads.slug}`}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
