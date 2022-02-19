import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import axios from "axios"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { A11y, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
// import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js"

import Layout from "../components/layout"

import Seo from "../components/seo"

import "swiper/css/bundle"

// import "swiper/swiper.scss"
import "swiper/css/effect-fade"
import "swiper/css/autoplay"

import {
  carouselUberCont,
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
} from "../styles/modules/indexStyles.module.scss"

import { imgavatar } from "../styles/modules/profStyles.module.scss"

import servImage from "../images/mamafrica.png"

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
              <small style={{ color: "#ababab" }}>JOIN THE MOVEMENT !</small>{" "}
              <br /> Klik{" "}
              <Link to="/app/login">
                <button
                  className={btn}
                  type="button"
                  style={{
                    padding: "1.5px 17.5px 0px 17.5px",
                    color: "#0e0e0e",
                    backgroundColor: "#cc9932",
                  }}
                >
                  hier
                </button>
              </Link>{" "}
              om in te loggen <span style={{ color: "#cc9932" }}>/</span>{" "}
              registreren..
            </p>
          </div>
          <img src={servImage} alt="" className={imgHide} />
        </div>

        <div className={carouselUberCont}>
          <Swiper
            modules={[A11y, Autoplay]}
            className={carouselCont}
            spaceBetween={50}
            slidesPerView={3}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={swiper => console.log(swiper)}
            // modules={[EffectFade]}
            // effect="fade"
            loop
            autoplay={{ delay: 5000 }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
            }}
          >
            {carousel.map(ads => (
              <SwiperSlide
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
                    // maxWidth: "200px",
                    minWidth: "150px",
                  }}
                  alt="avatar"
                />

                <div className={lead} style={{ color: "white" }}>
                  {ads.profiel}
                </div>

                <div
                  style={{
                    fontStyle: "italic",
                    fontSize: "0.75em",
                    color: "#2eb4e9",
                  }}
                >
                  {ads.occupate || ".."}
                </div>

                <ReactMarkdown
                  className={homeAdsBio}
                  children={ads.biografie || ".."}
                  remarkPlugins={[remarkGfm]}
                  // escapeHtml={false}
                />

                {/* {ads.createdAt} */}

                <div>
                  {" "}
                  <Link to={`/${ads.slug}`} style={{ color: "#cc9932" }}>
                    ✨../{`${ads.slug}`}
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
