import React, { useLayoutEffect, useState, useEffect } from "react"
import { Link } from "gatsby"
// import Reactmarkdown from "react-markdown"
import axios from "axios"

import Seo from "../components/seo"

import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa"
import { SiTiktok } from "react-icons/si"

// NEGO TEMPLATE
import ProfLayout from "../components/proflayout"

import { profCenter, imgavatar } from "../styles/modules/profStyles.module.scss"

import "../styles/themes.scss"

import afroLogo from "../../static/afroadiaspheretest.png"

import noavatar from "../images/noavatar.png"

// import { getUser } from "../services/auth"

// const gatsbyUser = getUser()

const apiURL = process.env.GATSBY_BASE_URL

const AdsTemplate = ({ pageContext: { id, slug } }) => {
  // useEffect(() => {
  //   function hideDiv(elem) {
  //     if (elem.href === "")
  //       document.getElementById("hideDiv").style.display = "none"
  //     else document.getElementById("hideDiv").style.display = "block"
  //   }
  //   hideDiv()
  // }, [])

  const [color, setColor] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [username, setUsername] = useState("")
  const [links, setLinks] = useState([])

  const [fbLink, setFbLink] = useState("")
  const [twLink, setTwLink] = useState("")
  const [igLink, setIgLink] = useState("")
  const [waLink, setWaLink] = useState("")
  const [tkLink, setTkLink] = useState("")

  useLayoutEffect(() => {
    const getLinks = async () => {
      const res = await axios.get(`${apiURL}/api/instanties/${id}/?populate=*`)
      const reslinks = await axios.get(`${apiURL}/api/connections?populate=*`)
      var allLinks = reslinks.data
      var sortedLinks = allLinks.filter(
        element => element.links.username === slug
      )

      setLinks(sortedLinks)
      setColor(res.data.data.attributes.bgfree)
      setUsername(res.data.data.attributes.profiel)
      setFbLink(res.data.data.attributes.facebooklink)
      setTwLink(res.data.data.attributes.twitterlink)
      setIgLink(res.data.data.attributes.instagramlink)
      setWaLink(res.data.data.attributes.whatsapplink)
      setTkLink(res.data.data.attributes.tiktoklink)

      if (!res.data.data.attributes.avatar.data) {
        return setAvatar(noavatar)
      } else {
        setAvatar(res.data.data.attributes.avatar.data.attributes?.url)
      }
    }
    getLinks()
  }, [id, slug])

  useEffect(() => {
    var fbhideman = document.getElementById("fbhidesm")
    if (fbLink < 9) {
      fbhideman.style.display = "none"
    } else {
      fbhideman.style.display = "block"
    }
    var twhideman = document.getElementById("twhidesm")
    if (twLink < 9) {
      twhideman.style.display = "none"
    } else {
      twhideman.style.display = "block"
    }
    var ighideman = document.getElementById("ighidesm")
    if (igLink < 9) {
      ighideman.style.display = "none"
    } else {
      ighideman.style.display = "block"
    }
    var wahideman = document.getElementById("wahidesm")
    if (waLink < 9) {
      wahideman.style.display = "none"
    } else {
      wahideman.style.display = "block"
    }
    var tkhideman = document.getElementById("tkhidesm")
    if (tkLink < 9) {
      tkhideman.style.display = "none"
    } else {
      tkhideman.style.display = "block"
    }
  }, [fbLink, twLink, igLink, waLink, tkLink])

  return (
    <ProfLayout>
      <Seo title={username} />
      {/* <Img
        fluid={data.strapiInstantie.background.childImageSharp.fluid}
        style={{
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          textAlign: "center",
          // opacity: 0.1,
        }}
      /> */}

      <div className={`theme-${color}`}>
        <div className={profCenter} style={{ zIndex: 2 }}>
          <img src={avatar} className={imgavatar} alt="avatar" />

          <h1>{username}</h1>
          {/* <Reactmarkdown
            source={data.strapiInstantie.biografie}
            className={profStyles.profielContent}
            escapeHtml={false}
          /> */}

          <ul>
            {links.slice(0, 20).map(link => (
              <li
                key={link.id}
                className={`theme-${color}-links`}
                hidden={!link.visible}
              >
                <a
                  href={`https://${link.hyperlink}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>

          <div className={`theme-${color}-icons`}>
            <a
              href={`https://${fbLink}`}
              rel="noopener noreferrer"
              target="_blank"
              id="fbhidesm"
            >
              <FaFacebookF size="2em" />
            </a>

            <a
              href={`https://${twLink}`}
              rel="noopener noreferrer"
              target="_blank"
              id="twhidesm"
            >
              <FaTwitter size="2em" />
            </a>

            <a
              href={`https://${igLink}`}
              rel="noopener noreferrer"
              target="_blank"
              id="ighidesm"
            >
              <FaInstagram size="2em" />
            </a>

            <a
              href={`https://wa.me/${waLink}`}
              rel="noopener noreferrer"
              target="_blank"
              id="wahidesm"
            >
              <FaWhatsapp size="2em" />
            </a>

            <a
              href={`https://${tkLink}`}
              rel="noopener noreferrer"
              target="_blank"
              id="tkhidesm"
            >
              <SiTiktok size="2em" />
            </a>
          </div>

          <Link to="/">
            <img
              src={afroLogo}
              alt=""
              style={{
                top: "100px",
                position: "relative",
                width: "100px",
              }}
            ></img>
          </Link>

          {/* <p></p>
            by{" "}
            <Link to={`/gebruiker/User_${data.strapiAfrosite.website.id}`}>
              {data.strapiAfrosite.website.username}
            </Link>
          </p> */}
        </div>
      </div>
    </ProfLayout>
  )
}

export default AdsTemplate

// export const query = graphql`
//   query InstantieTemplate($slug: String!) {
//     instantie {
//       instanties(filters: { slug: { eq: $slug } }) {
//         data {
//           id
//           attributes {
//             slug
//           }
//         }
//       }
//     }
//   }
// `

// (slug: { eq: $slug })
