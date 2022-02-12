import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react"
import { Link } from "gatsby"
import axios from "axios"
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaTrash,
  FaWhatsapp,
} from "react-icons/fa"

import { SiTiktok } from "react-icons/si"

import Seo from "../seo"

import { navigate } from "@reach/router"
import { getUser, logout } from "../../services/auth"

import noavatar from "../../images/noavatar.png"

import {
  logerror,
  linkErrorStyle,
  yellowstyleUsername,
  yellowstyleIcons,
  yellowstyle,
  yellowstyleLinks,
  graystyleUsername,
  graystyleIcons,
  graystyle,
  graystyleLinks,
  pinkstyleUsername,
  pinkstyleIcons,
  pinkstyle,
  pinkstyleLinks,
  blackstyleUsername,
  blackstyleIcons,
  blackstyle,
  blackstyleLinks,
  brownstyleUsername,
  brownstyleIcons,
  brownstyle,
  brownstyleLinks,
  greenstyleUsername,
  greenstyleIcons,
  greenstyle,
  greenstyleLinks,
  afrospecstyleUsername,
  afrospecstyleIcons,
  afrospecstyle,
  afrospecstyleLinks,
  gridContainer,
  card,
  Sidebar,
  btn,
  Preview,
  iphoneFrame,
  iphoneAvatar,
  // iphoneUsername,
  iphoneBackground,
  iphoneLinks,
  iphoneSocials,
  Dashboard,
  p3,
  avatarformcont,
  formavatar,
  avatarImage,
  loadingComplete,
  buttonsenzo,
  addBtn,
  btnLight,
  resetBtn,
  btnSecondary,
  submitBtn,
  profileInfo,
  profileInput,
  socialCont,
  socialIcons,
  socialInput,
  vl,
  linksCont,
  linkCont,
  updateLinkShow,
  editInput,
  updateHyperLinkShow,
  trashBtn,
  inputCont,
  checkmark,
  pickColor,
  chooseColor,
  yellowtheme,
  yellowlinks,
  graytheme,
  graylinks,
  pinktheme,
  pinklinks,
  blacktheme,
  blacklinks,
  browntheme,
  brownlinks,
  greentheme,
  greenlinks,
  afrospectheme,
  afrospeclinks,
  Adslink,
  usLinkAfro,
  usLinkSite,
  userLink,
  currentStyle,
  linksOnline,
  buttonsOnline,
  updateLinkcont,
  updateHyperLinkcont,
  deleteShowcont,
  mobileHr,
} from "../../styles/modules/accountStyles.module.scss"

const apiURL = process.env.GATSBY_BASE_URL
const instURL = process.env.GATSBY_CURR_URL

const ErrorMessage = ({ text }) => {
  return (
    <div className={logerror}>
      <span>{text}</span>
    </div>
  )
}

const DoThis = ({ text }) => {
  return (
    <div className={linkErrorStyle}>
      <span>{text}</span>
    </div>
  )
}

const DashboardPage = () => {
  // const { site } = useStaticQuery(
  //   graphql`
  //     query {
  //       site {
  //         siteMetadata {
  //           siteUrl
  //         }
  //       }
  //     }
  //   `
  // )

  const [userId, setUserId] = useState("")

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState()
  const fileInputRef = useRef()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [linkError, setLinkError] = useState(null)

  const [profile, setProfile] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [slug, setSlug] = useState("")

  const [fbLink, setFbLink] = useState("")
  const [twLink, setTwLink] = useState("")
  const [igLink, setIgLink] = useState("")
  const [waLink, setWaLink] = useState("")
  const [tkLink, setTkLink] = useState("")

  const linkTitle = useRef()
  const hyperLink = useRef()
  const [links, setLinks] = useState([])

  const [editLink, setEditLink] = useState("")
  const [editHyperLink, setEditHyperLink] = useState("")

  const [color, setColor] = useState()

  const gatsbyUser = getUser()
  const token = gatsbyUser.jwt

  const getUserId = useCallback(async () => {
    const res = await axios.get(`${apiURL}/api/instanties`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setUserId(res.data.id)
  }, [token])

  useEffect(() => {
    getUserId()
  }, [getUserId])

  // AVATAR CHANGE <--------------------------------------------------------------------------------> AVATAR CHANGE //
  const removeHeading = () => {
    // document.getElementById("avatar-image").src = noavatar
    // document.getElementById("iphone-avatar").src = noavatar
    setImage(null)
    setPreview(noavatar)
  }

  // SEND AVATAR <--------------------------------------------------------------------------------> SEND AVATAR //
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setLoading(true)
      setImage(image)

      const imgData = new FormData()
      imgData.append("files", image)
      imgData.append("ref", "api::instantie.instantie") // optional, you need it if you want to link the image to an entry
      imgData.append("refId", userId) // optional, you need it if you want to link the image to an entry
      imgData.append("field", "avatar") // optional, you need it if you want to link the image to an entry

      const res = await axios.post(`${apiURL}/api/upload/`, imgData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log("Geupload!", res)
      // setPreview(res.data.data.attributes[0].url)
      setTimeout(() => setLoading(false), 5000)
    } catch (error) {
      console.log("Niet gelukt!", error)
    }
  }

  useEffect(() => {
    if (image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(image)
    }
  }, [image])

  useEffect(() => {
    const getAvatarImage = async () => {
      const res = await axios.get(`${apiURL}/api/instanties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.data.avatar) {
        setPreview(noavatar)
      } else {
        setPreview(res.data.avatar.url)
      }
    }

    getAvatarImage()
  }, [userId, token])

  // UPDATE PROFILENAME <--------------------------------------------------------------------------------> UPDATE PROFILENAME //
  const setProfileHandler = e => {
    setProfile(e.target.value)
  }

  const submitProfile = async e => {
    e.preventDefault()

    const params = {
      profiel: profile,
    }
    try {
      await axios.put(
        `${apiURL}/api/instanties/${userId}`,
        { data: params },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setError(null)
    } catch (err) {
      console.log(err.message)
      setError("Er is iets misgegaan, probeer het opnieuw!")
      setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.get(`${apiURL}/api/instanties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // if (!res.data.profiel) {
      //   setProfile("")
      // } else {
      //   setProfile(res.data.profiel)
      // }
      setProfile(res.data.profiel)
    }
    getProfile()
  }, [userId, token])

  // UPDATE USERNAME <--------------------------------------------------------------------------------> UPDATE USERNAME //

  const setUsernameHandler = e => {
    setUsername(e.target.value.toLowerCase().replace(/\s+/g, ""))
  }

  const submitUsername = async e => {
    e.preventDefault()

    const params = {
      username: username,
    }
    try {
      await axios.put(`${apiURL}/api/users/${gatsbyUser.user.id}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setError(null)
    } catch (err) {
      setError("Er is iets misgegaan, probeer het opnieuw!")
      setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const getUsername = async () => {
      const res = await axios.get(`${apiURL}/api/users/${gatsbyUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUsername(res.data.username)
    }
    getUsername()
  }, [gatsbyUser.user.id, token])

  // UPDATE EMAIL <--------------------------------------------------------------------------------> UPDATE EMAIL //
  const setEmailHandler = e => {
    setEmail(e.target.value)
  }

  const submitEmail = async e => {
    e.preventDefault()

    const params = {
      email: email,
    }
    try {
      await axios.put(`${apiURL}/api/users/${gatsbyUser.user.id}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setError(null)
    } catch (err) {
      console.log(err.message)
      setError("Er is iets misgegaan, probeer het opnieuw!")
      setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const getEmail = async () => {
      const res = await axios.get(`${apiURL}/api/users/${gatsbyUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setEmail(res.data.email)
    }
    getEmail()
  }, [gatsbyUser.user.id, token])

  // UPDATE FBLINK <--------------------------------------------------------------------------------> UPDATE FBLINK //
  const setFbHandler = e => {
    setFbLink(e.target.value.toLowerCase())
  }

  useEffect(() => {
    var fbhideme = document.getElementById("fbhide")
    if (fbLink < 1) {
      fbhideme.style.display = "none"
    } else {
      fbhideme.style.display = "block"
    }
  }, [fbLink])

  const submitFB = async e => {
    e.preventDefault()

    const params = {
      facebooklink: fbLink,
    }
    try {
      await axios.put(
        `${apiURL}/api/instanties/${userId}`,
        { data: params },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setError(null)
    } catch (err) {
      console.log(err.message)
      setError("Er is iets misgegaan, probeer het opnieuw!")
      setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const getFbLink = async () => {
      const res = await axios.get(`${apiURL}/api/instanties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setFbLink(res.data.facebooklink)
    }
    getFbLink()
  }, [userId, token])

  // UPDATE TWLINK <--------------------------------------------------------------------------------> UPDATE TWLINK //
  const setTwHandler = e => {
    setTwLink(e.target.value.toLowerCase())
  }

  useEffect(() => {
    var twhideme = document.getElementById("twhide")
    if (twLink < 1) {
      twhideme.style.display = "none"
    } else {
      twhideme.style.display = "block"
    }
  }, [twLink])

  const submitTW = async e => {
    e.preventDefault()

    const params = {
      twitterlink: twLink,
    }
    try {
      await axios.put(
        `${apiURL}/api/instanties/${userId}`,
        { data: params },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setError(null)
    } catch (err) {
      console.log(err.message)
      setError("Er is iets misgegaan, probeer het opnieuw!")
      setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const getTwLink = async () => {
      const res = await axios.get(`${apiURL}/api/instanties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTwLink(res.data.twitterlink)
    }
    getTwLink()
  }, [userId, token])

  // UPDATE IGLINK <--------------------------------------------------------------------------------> UPDATE IGLINK //
  const setIgHandler = e => {
    setIgLink(e.target.value.toLowerCase())
  }

  useEffect(() => {
    var ighideme = document.getElementById("ighide")
    if (igLink < 1) {
      ighideme.style.display = "none"
    } else {
      ighideme.style.display = "block"
    }
  }, [igLink])

  const submitIG = async e => {
    e.preventDefault()

    const params = {
      instagramlink: igLink,
    }
    try {
      await axios.put(
        `${apiURL}/api/instanties/${userId}`,
        { data: params },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setError(null)
    } catch (err) {
      console.log(err.message)
      setError("Er is iets misgegaan, probeer het opnieuw!")
      setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const getIgLink = async () => {
      const res = await axios.get(`${apiURL}/api/instanties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setIgLink(res.data.instagramlink)
    }
    getIgLink()
  }, [userId, token])

  // UPDATE WHATSAPP <--------------------------------------------------------------------------------> UPDATE WHATSAPP //
  const setWaHandler = e => {
    setWaLink(e.target.value.toLowerCase())
  }

  useEffect(() => {
    var wahideme = document.getElementById("wahide")
    if (waLink < 1) {
      wahideme.style.display = "none"
    } else {
      wahideme.style.display = "block"
    }
  }, [waLink])

  const submitWA = async e => {
    e.preventDefault()

    const params = {
      whatsapplink: waLink,
    }
    try {
      await axios.put(
        `${apiURL}/api/instanties/${userId}`,
        { data: params },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setError(null)
    } catch (err) {
      console.log(err.message)
      setError("Er is iets misgegaan, probeer het opnieuw!")
      setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const getWaLink = async () => {
      const res = await axios.get(`${apiURL}/api/instanties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setWaLink(res.data.whatsapplink)
    }
    getWaLink()
  }, [userId, token])

  // UPDATE TIKTOK <--------------------------------------------------------------------------------> UPDATE TIKTOK //
  const setTkHandler = e => {
    setTkLink(e.target.value.toLowerCase())
  }

  useEffect(() => {
    var tkhideme = document.getElementById("tkhide")
    if (tkLink < 1) {
      tkhideme.style.display = "none"
    } else {
      tkhideme.style.display = "block"
    }
  }, [tkLink])

  const submitTK = async e => {
    e.preventDefault()

    const params = {
      tiktoklink: tkLink,
    }
    try {
      await axios.put(
        `${apiURL}/api/instanties/${userId}`,
        { data: params },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setError(null)
    } catch (err) {
      console.log(err.message)
      setError("Er is iets misgegaan, probeer het opnieuw!")
      setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const getTkLink = async () => {
      const res = await axios.get(`${apiURL}/api/instanties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTkLink(res.data.tiktoklink)
    }
    getTkLink()
  }, [userId, token])

  // UPDATE PASSWORD <--------------------------------------------------------------------------------> UPDATE PASSWORD //
  const setPasswordHandler = e => {
    setPassword(e.target.value)
  }

  const submitPassword = async e => {
    e.preventDefault()

    const params = {
      password: password,
    }
    try {
      await axios.put(`${apiURL}/api/users/${gatsbyUser.user.id}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setError(null)
    } catch (err) {
      console.log(err.message)
      setError("Er is iets misgegaan, probeer het opnieuw!")
      setTimeout(() => setError(null), 5000)
    }
  }

  // UPDATE SLUG <--------------------------------------------------------------------------------> UPDATE SLUG //
  const setSlugHandler = e => {
    setSlug(e.target.value.toLowerCase())
  }

  const submitSlug = async e => {
    e.preventDefault()

    const params = {
      slug: slug,
    }
    try {
      await axios.put(
        `${apiURL}/api/instanties/${userId}`,
        { data: params },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setError(null)

      // axios.post(
      //   "https://api.netlify.com/build_hooks/5fa20c6490bf4b2b591bf2e1",
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // )
    } catch (err) {
      console.log(err.message)
      setError("Er is iets misgegaan, probeer het opnieuw!")
      setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const getSlug = async () => {
      const res = await axios.get(`${apiURL}/api/instanties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setSlug(res.data.slug)
    }
    getSlug()
  }, [userId, token])

  // CREATE LINKS <--------------------------------------------------------------------------------> CREATE LINKS //
  const createLink = async () => {
    if (
      (!linkTitle.current.value && !hyperLink.current.value) ||
      /^\s*$/.test(linkTitle.current.value && hyperLink.current.value)
    ) {
      return [
        setLinkError("Posten mislukt, voer de titel of link correct door.."),
        setTimeout(() => setLinkError(null), 7500),
      ]
    }

    const params = {
      title: linkTitle.current.value,
      hyperlink: hyperLink.current.value,
    }
    const res = await axios.post(
      `${apiURL}/api/connections`,
      { data: params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const newLinks = [...links, res.data.data.attributes]
    setLinks(newLinks)

    getLinks()
    linkTitle.current.value = ""
    hyperLink.current.value = ""
  }

  // TOGGLE LINKS <--------------------------------------------------------------------------------> TOGGLE LINKS //
  const toggleLink = async (link, checked) => {
    const params = {
      visible: checked,
    }
    const res = await axios.put(
      `${apiURL}/api/connections/${link.id}`,
      { data: params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const newLinks = links.map(el => {
      if (el.id === link.id) {
        return res.data.data.attributes
      }
      return el
    })
    setLinks(newLinks)
    getLinks()
  }

  // DELETE LINKS <--------------------------------------------------------------------------------> DELETE LINKS //
  const deleteLink = async link => {
    await axios.delete(`${apiURL}/api/connections/${link.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setLinks(links.filter(el => el.id !== link.id))
  }

  const handleEditLink = async e => {
    setEditLink(e.target.value)
  }

  const handleEditHyperLink = async e => {
    setEditHyperLink(e.target.value)
  }

  // EDIT LINKS <--------------------------------------------------------------------------------> EDIT LINKS //
  const editTheLink = async link => {
    if (!editLink || /^\s*$/.test(editLink)) {
      return [
        setLinkError("Updaten mislukt, voer de titel correct door.."),
        setTimeout(() => setLinkError(null), 7500),
      ]
    }

    const params = {
      title: editLink,
    }
    const res = await axios.put(
      `${apiURL}/api/connections/${link.id}`,
      { data: params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const newLinks = links.map(el => {
      if (el.id === link.id) {
        return res.data.data.attributes
      }
      return el
    })
    setLinks(newLinks)
    getLinks()
  }

  // EDIT HYPERLINKS <--------------------------------------------------------------------------------> EDIT HYPERLINKS //
  const editTheHyperLink = async link => {
    if (!editHyperLink || /^\s*$/.test(editHyperLink)) {
      return [
        setLinkError("Updaten mislukt, voer de link correct door.."),
        setTimeout(() => setLinkError(null), 5000),
      ]
    }

    const params = {
      hyperlink: editHyperLink,
    }
    const res = await axios.put(
      `${apiURL}/api/connections/${link.id}`,
      { data: params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const newLinks = links.map(el => {
      if (el.id === link.id) {
        return res.data.data.attributes
      }
      return el
    })
    setLinks(newLinks)
    setEditHyperLink("")
    getLinks()
  }

  // GET LINKS <--------------------------------------------------------------------------------> GET LINKS //

  const getLinks = useCallback(async () => {
    const res = await axios.get(`${apiURL}/api/connections`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setLinks(res.data)
  }, [token])

  useLayoutEffect(() => {
    getLinks()
  }, [getLinks])

  // CHANGE THEME <--------------------------------------------------------------------------------> CHANGE THEME //
  const onRadioChange = async e => {
    setColor(e.target.value)

    const params = {
      bgfree: e.target.value,
    }
    await axios.put(
      `${apiURL}/api/instanties/${userId}`,
      { data: params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    // .then(response => {
    //   console.log(response)
    // })
    // .catch(error => {
    //   console.log(error.response.data.message)
    // })
  }

  const changeHeadingBg = color => {
    var c = document.getElementById("iphone-linklook").children
    var i

    switch (color) {
      case "geel":
        document.getElementById("iphone-username").className =
          yellowstyleUsername
        document.getElementById("iphone-iconlook").className = yellowstyleIcons
        document.getElementById("iphone-bg").className = yellowstyle
        for (i = 0; i < c.length; i++) {
          c[i].className = yellowstyleLinks
        }
        break
      case "grijs":
        document.getElementById("iphone-username").className = graystyleUsername
        document.getElementById("iphone-iconlook").className = graystyleIcons
        document.getElementById("iphone-bg").className = graystyle
        for (i = 0; i < c.length; i++) {
          c[i].className = graystyleLinks
        }
        break
      case "roze":
        document.getElementById("iphone-username").className = pinkstyleUsername
        document.getElementById("iphone-iconlook").className = pinkstyleIcons
        document.getElementById("iphone-bg").className = pinkstyle
        for (i = 0; i < c.length; i++) {
          c[i].className = pinkstyleLinks
        }
        break
      case "zwart":
        document.getElementById("iphone-username").className =
          blackstyleUsername
        document.getElementById("iphone-iconlook").className = blackstyleIcons
        document.getElementById("iphone-bg").className = blackstyle
        for (i = 0; i < c.length; i++) {
          c[i].className = blackstyleLinks
        }
        break
      case "bruin":
        document.getElementById("iphone-username").className =
          brownstyleUsername
        document.getElementById("iphone-iconlook").className = brownstyleIcons
        document.getElementById("iphone-bg").className = brownstyle
        for (i = 0; i < c.length; i++) {
          c[i].className = brownstyleLinks
        }
        break
      case "groen":
        document.getElementById("iphone-username").className =
          greenstyleUsername
        document.getElementById("iphone-iconlook").className = greenstyleIcons
        document.getElementById("iphone-bg").className = greenstyle
        for (i = 0; i < c.length; i++) {
          c[i].className = greenstyleLinks
        }
        break
      case "afrotheme":
        document.getElementById("iphone-username").className =
          afrospecstyleUsername
        document.getElementById("iphone-iconlook").className =
          afrospecstyleIcons
        document.getElementById("iphone-bg").className = afrospecstyle
        for (i = 0; i < c.length; i++) {
          c[i].className = afrospecstyleLinks
        }
        break
      default:
    }
  }

  useEffect(() => {
    const getColor = async () => {
      const res = await axios.get(`${apiURL}/api/instanties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setColor(res.data.bgfree)
      changeHeadingBg(res.data.bgfree)
    }
    getColor()
    changeHeadingBg()
    // }, [userId, token, links])
  }, [token, links])

  useEffect(() => {
    if (color === "geel") {
      document.getElementById("currentYellow").classList.add(currentStyle)
    } else {
      document.getElementById("currentYellow").classList.remove(currentStyle)
    }
    if (color === "grijs") {
      document.getElementById("currentGrey").classList.add(currentStyle)
    } else {
      document.getElementById("currentGrey").classList.remove(currentStyle)
    }
    if (color === "roze") {
      document.getElementById("currentPink").classList.add(currentStyle)
    } else {
      document.getElementById("currentPink").classList.remove(currentStyle)
    }
    if (color === "zwart") {
      document.getElementById("currentBlack").classList.add(currentStyle)
    } else {
      document.getElementById("currentBlack").classList.remove(currentStyle)
    }
    if (color === "bruin") {
      document.getElementById("currentBrown").classList.add(currentStyle)
    } else {
      document.getElementById("currentBrown").classList.remove(currentStyle)
    }
    if (color === "groen") {
      document.getElementById("currentGreen").classList.add(currentStyle)
    } else {
      document.getElementById("currentGreen").classList.remove(currentStyle)
    }
    if (color === "afrotheme") {
      document.getElementById("currentAfro").classList.add(currentStyle)
    } else {
      document.getElementById("currentAfro").classList.remove(currentStyle)
    }
  }, [color])

  // function changeHeadingBg(klasse) {
  //   document.getElementById("iphone-bg").className = klasse
  // }

  return (
    <>
      <Seo title="Dashboard" />
      <div className={`${gridContainer} ${card}`}>
        {/* SIDEBAR SIDEBAR SIDEBAR SIDEBAR SIDEBAR <--------------------------------------------------------------------------------> SIDEBAR SIDEBAR SIDEBAR SIDEBAR SIDEBAR */}

        <aside
          id="ads-side"
          className={`${Sidebar} ${card}`}
          style={{
            position: "relative",
          }}
        >
          <h5
            // className={userTitle}
            style={{
              textAlign: "center",
              fontSize: "0.75em",
              color: "white",
            }}
          >
            Welkom{" "}
            <span
              style={{
                color: "#ababab",
              }}
            >
              {gatsbyUser.user.username}
            </span>{" "}
            !
          </h5>

          <button
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              color: "white",
              backgroundColor: "#ababab",
            }}
            className={btn}
            href="#"
            onClick={e => {
              e.preventDefault()
              logout(() => navigate("/app/login"))
            }}
          >
            Logout
          </button>
        </aside>

        {/* NAVIGATION NAVIGATION NAVIGATION NAVIGATION <--------------------------------------------------------------------------------> NAVIGATION NAVIGATION NAVIGATION NAVIGATION */}
        {/* <div
        className={`${accountStyles.Navigation} ${accountStyles.card}`}
      ></div> */}

        {/* PREVIEW PREVIEW PREVIEW PREVIEW PREVIEW <--------------------------------------------------------------------------------> PREVIEW PREVIEW PREVIEW PREVIEW PREVIEW */}
        <section id="ads-preview" className={`${Preview} ${card}`}>
          <div className={iphoneFrame}>
            {" "}
            <img
              src={preview}
              alt=""
              className={iphoneAvatar}
              id="iphone-avatar"
              style={{ border: "3px solid white" }}
            />
            <p
              id="iphone-username"
              // className={iphoneUsername}
            >
              {profile ? profile : null}
            </p>
            <div
              id="iphone-bg"
              className={iphoneBackground}
              style={{
                position: "relative",
                // width: "100vh",
                height: "100%",
                zindex: 1,
              }}
            />
            <div>
              <ul className={iphoneLinks} id="iphone-linklook">
                {links.slice(0, 5).map(link => (
                  <li
                    key={link.id}
                    id={`link${link.id}`}
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
            </div>
            <div className={iphoneSocials} id="iphone-iconlook">
              <a
                href={`https://${fbLink}`}
                rel="noopener noreferrer"
                target="_blank"
                id="fbhide"
              >
                <FaFacebookF size="1.75em" />
              </a>

              <a
                href={`https://${twLink}`}
                rel="noopener noreferrer"
                target="_blank"
                id="twhide"
              >
                <FaTwitter size="1.75em" />
              </a>

              <a
                href={`https://${igLink}`}
                rel="noopener noreferrer"
                target="_blank"
                id="ighide"
              >
                <FaInstagram size="1.75em" />
              </a>

              <a
                href={`https://wa.me/${waLink}`}
                rel="noopener noreferrer"
                target="_blank"
                id="wahide"
              >
                <FaWhatsapp size="1.75em" />
              </a>

              <a
                href={`https://${tkLink}`}
                rel="noopener noreferrer"
                target="_blank"
                id="tkhide"
              >
                <SiTiktok size="1.75em" />
              </a>
            </div>
            {/* <img
            src={gatsbyUser.user.gebruiker.background.url}
            alt=""
            className={accountStyles.iphoneBg}
          />{" "} */}
          </div>
        </section>

        {/* DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD <--------------------------------------------------------------------------------> DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD */}

        <section id="ads-dashboard" className={`${Dashboard} ${p3} ${card}`}>
          <br />

          <h2 style={{ textAlign: "center" }}>
            <b>
              <u
                style={{
                  color: "white",
                  textDecoration: "underline",
                  textDecorationColor: "grey",
                }}
              >
                Profile Info
              </u>
            </b>
          </h2>

          <br />

          <div className={avatarformcont}>
            <form onSubmit={handleSubmit} className={formavatar}>
              <div>
                <img
                  src={preview}
                  alt=""
                  className={avatarImage}
                  id="avatar-image"
                  style={{ border: "3px solid white" }}
                />{" "}
                {loading && (
                  <div className={loadingComplete}>Profielfoto Geupload</div>
                )}
              </div>

              <div className={buttonsenzo}>
                <button
                  className={`${btn} ${addBtn}`}
                  onClick={event => {
                    event.preventDefault()
                    fileInputRef.current.click()
                  }}
                >
                  {" "}
                  Add image
                </button>
                <button
                  className={`${btn} ${btnLight} ${resetBtn}`}
                  type="reset"
                  onClick={event => {
                    removeHeading()
                    event.preventDefault()
                  }}
                >
                  Reset
                </button>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={event => {
                    const file = event.target.files[0]
                    console.log(event.target.files[0])

                    if (file && file.type.substring(0, 5) === "image") {
                      setImage(file)
                    } else {
                      setImage(null)
                    }
                  }}
                />
                <button
                  className={`${btn} ${btnSecondary} ${submitBtn}`}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* PROFILE INFO ROFILE INFO PROFILE INFO PROFILE INFO <--------------------------------------------------------------------------------> PROFILE INFO PROFILE INFO PROFILE INFO PROFILE INFO */}

            <div className={profileInfo}>
              <form onSubmit={submitProfile}>
                {/* <FaRegUserCircle
                  color="#cc9932"
                  size="1em"
                  style={{
                    position: "relative",
                    top: "7.5px",
                    margin: "0 10px",
                  }}
                /> */}
                <label htmlFor="profile">Profielnaam</label>
                <input
                  onChange={setProfileHandler}
                  value={profile || ""}
                  type="text"
                  maxLength="35"
                  name="text"
                  id="profile"
                  className={profileInput}
                  style={{
                    cursor: "pointer",
                  }}
                />
                <button
                  className={btn}
                  type="submit"
                  style={{
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Save
                </button>
              </form>

              <form onSubmit={submitUsername}>
                {/* <FaUser
                    color="#cc9932"
                    size="1em"
                    style={{
                      position: "relative",
                      top: "7.5px",
                      margin: "0 10px",
                    }}
                  /> */}
                <label htmlFor="username">Gebruikersnaam</label>
                <input
                  onChange={setUsernameHandler}
                  value={username || ""}
                  type="text"
                  maxLength="25"
                  name="username"
                  id="username"
                  pattern="[^\s]+"
                  title="Geen spaties"
                  className={profileInput}
                  style={{
                    cursor: "pointer",
                  }}
                />
                <button
                  className={btn}
                  type="submit"
                  style={{
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Save
                </button>
              </form>

              <form onSubmit={submitEmail}>
                <label htmlFor="email">Email</label>
                {/* <FaAt
                  color="#cc9932"
                  size="1em"
                  style={{
                    position: "relative",
                    top: "7.5px",
                    margin: "0 10px",
                  }}
                /> */}
                <input
                  onChange={setEmailHandler}
                  value={email || ""}
                  type="email"
                  name="email"
                  maxLength="35"
                  id="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  className={profileInput}
                />

                <button
                  className={btn}
                  type="submit"
                  style={{
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Save
                </button>
              </form>

              <form onSubmit={submitPassword}>
                <label htmlFor="password"> Password </label>
                {/* <FaLock
                  color="#cc9932"
                  size="1em"
                  style={{
                    position: "relative",
                    top: "7.5px",
                    margin: "0 10px",
                  }}
                /> */}
                <input
                  onChange={setPasswordHandler}
                  value={password || ""}
                  placeholder="*********"
                  type="password"
                  when
                  name="password"
                  id="password"
                  className={profileInput}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Moet op z'n minst 1 nummer, 1 hoofdletter, 1 klein letter en 8 karakters lang zijn."
                  style={{
                    cursor: "pointer",
                  }}
                />

                <button
                  className={`${btn} ${btnSecondary} ${submitBtn}`}
                  type="submit"
                  style={{
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Update
                </button>
              </form>

              <form onSubmit={submitSlug}>
                {/* <FaGlobe
                  color="#cc9932"
                  size="1em"
                  style={{
                    position: "relative",
                    top: "7.5px",
                    margin: "0 10px",
                  }}
                /> */}
                <label htmlFor="slug">Slug</label>
                <input
                  onChange={setSlugHandler}
                  value={slug}
                  type="text"
                  name="slug"
                  id="slug"
                  readOnly
                  disabled
                  // placeholder="*verplicht, bijv: 'jouw-profiel'"
                  placeholder="*verplicht, de beheerder maakt deze voor u aan"
                  maxLength="15"
                  className={profileInput}
                  pattern="[^\s]+"
                  title="geen spaties, alleen '-'"
                />

                <button
                  className={btn}
                  type="submit"
                  disabled
                  style={{
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    background: "red",
                    opacity: "0.3",
                  }}
                >
                  Update
                </button>
              </form>
            </div>
            {error && <ErrorMessage text={error} />}
          </div>

          <hr
            style={{
              border: "1px solid white",
              opacity: "0.025",
              width: "50%",
              margin: "75px auto",
            }}
            className={mobileHr}
          />

          {/* SOCIAL CONT SOCIAL CONT SOCIAL CONT SOCIAL CONT <--------------------------------------------------------------------------------> SOCIAL CONT SOCIAL CONT SOCIAL CONT SOCIAL CONT SOCIAL CONT */}

          <h2 style={{ textAlign: "center" }}>
            <b>
              <u
                style={{
                  color: "white",
                  textDecoration: "underline",
                  textDecorationColor: "grey",
                }}
              >
                Social Links
              </u>
            </b>
          </h2>

          {/* <div className={socialButtons}>
           */}

          <div className={socialCont}>
            <form onSubmit={submitFB}>
              <label htmlFor="fblink">
                <FaFacebookF
                  size="1.1em"
                  className={socialIcons}
                  color="#4867AA"
                />
                Facebook
              </label>
              <input
                onChange={setFbHandler}
                value={fbLink}
                type="text"
                name="fblink"
                id="fblink"
                placeholder="facebook.com/jouwprofiel"
                className={socialInput}
              />
              <button
                className={btn}
                type="submit"
                style={{
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                Save
              </button>
            </form>

            <div style={{ position: "relative" }}>
              <div className={vl}></div>
            </div>

            <form onSubmit={submitTW}>
              <label htmlFor="twlink">
                <FaTwitter
                  size="1.1em"
                  className={socialIcons}
                  color="#1FA1F1"
                />
                Twitter
              </label>
              <input
                onChange={setTwHandler}
                value={twLink}
                type="text"
                name="twlink"
                id="twlink"
                placeholder="twitter.com/jouwprofiel"
                className={socialInput}
              />
              <button
                className={btn}
                type="submit"
                style={{
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                Save
              </button>
            </form>

            <div style={{ position: "relative" }}>
              <div className={vl}></div>
            </div>

            <form onSubmit={submitIG}>
              <label htmlFor="iglink">
                <FaInstagram
                  size="1.1em"
                  className={socialIcons}
                  color="#F81F58"
                />
                Instagram
              </label>

              <input
                onChange={setIgHandler}
                value={igLink}
                type="text"
                name="iglink"
                id="iglink"
                placeholder="instagram.com/jouwprofiel"
                className={socialInput}
              />

              <button
                className={btn}
                type="submit"
                style={{
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                Save
              </button>
            </form>

            <div style={{ position: "relative" }}>
              <div className={vl}></div>
            </div>

            <form onSubmit={submitWA}>
              <label htmlFor="walink">
                <FaWhatsapp
                  size="1.1em"
                  className={socialIcons}
                  color="#3FD252"
                />
                Whatsapp
              </label>
              <input
                onChange={setWaHandler}
                value={waLink}
                type="text"
                name="walink"
                id="walink"
                maxLength="15"
                placeholder="bijv.: 31601234567"
                className={socialInput}
              />
              <button
                className={btn}
                type="submit"
                style={{
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                Save
              </button>
            </form>

            <div style={{ position: "relative" }}>
              <div className={vl}></div>
            </div>

            <form onSubmit={submitTK}>
              <label htmlFor="tklink">
                <SiTiktok
                  size="1.1em"
                  className={socialIcons}
                  color="#4BE1EB"
                />
                TikTok
              </label>
              <input
                onChange={setTkHandler}
                value={tkLink}
                type="text"
                name="tklink"
                id="tklink"
                placeholder="tiktok.com/jouwprofiel"
                className={socialInput}
              />
              <button
                className={btn}
                type="submit"
                style={{
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                Save
              </button>
            </form>
          </div>

          <hr
            style={{
              border: "1px solid white",
              opacity: "0.025",
              width: "50%",
              margin: "75px auto",
            }}
            className={mobileHr}
          />

          {/* ADD LINK SECTIE ADD LINK SECTIE ADD LINK SECTIE ADD LINK SECTIE <--------------------------------------------------------------------------------> ADD LINK SECTIE ADD LINK SECTIE ADD LINK SECTIE */}

          <h2 style={{ textAlign: "center" }}>
            <b>
              <u
                style={{
                  color: "white",
                  textDecoration: "underline",
                  textDecorationColor: "grey",
                }}
              >
                Hyper Links
              </u>
            </b>
          </h2>

          <br />
          {/* <div style={{ position: "relative" }}> */}
          <div className={linkCont}>
            <div className={linksOnline}>
              <label htmlFor="newlink">
                <h3 style={{ color: "white" }}>
                  Titel<span style={{ color: "#cc9932" }}>:</span>
                </h3>
              </label>
              <input
                // className={linkInput}
                id="newlink"
                type="text"
                placeholder="voer een titel in"
                ref={linkTitle}
                minLength="5"
                required
              />
            </div>
            <div className={linksOnline}>
              <label htmlFor="newhyperlink">
                <h3 style={{ color: "white" }}>
                  Hyperlink<span style={{ color: "#cc9932" }}>:</span>
                </h3>
              </label>
              <input
                id="newhyperlink"
                // className={linkInput}
                type="url"
                placeholder="voer hyperlink in, bijv: voorbeeld.nl"
                ref={hyperLink}
                style={{ textTransform: "lowercase" }}
                minLength="5"
                required
              />
            </div>
            {/* ${nextoClear} */}
            <div className={buttonsOnline}>
              <button
                className={`${btn} ${btnSecondary}`}
                onClick={event => {
                  createLink()
                  event.preventDefault()
                }}
              >
                Creëer link
              </button>
              <button
                className={btn}
                style={{ background: "red", color: "white" }}
                onClick={event => {
                  linkTitle.current.value = ""
                  hyperLink.current.value = ""
                  event.preventDefault()
                }}
              >
                Reset
              </button>
            </div>
            {/* <div style={{ clear: "both" }} /> */}
            {linkError && <DoThis text={linkError} />}
          </div>

          <br />

          {/* LINK LIST LIK LIST LINK LIST LIK LIST LINK LIST LIK LIST <--------------------------------------------------------------------------------> LINK LIST LIK LIST LINK LIST LIK LIST LINK LIST LIK LIST */}

          <ul>
            {links.map(link => (
              <li key={link.id} className={`${linksCont} ${card}`}>
                <div className={updateLinkcont}>
                  <div>
                    <p className={updateLinkShow}>{link.title}</p>
                    <input
                      className={editInput}
                      id={`editlink${link.id}`}
                      type="text"
                      size="25"
                      value={editLink[link]}
                      onChange={handleEditLink}
                      placeholder="bewerk titel"
                      minLength="5"
                      required
                    />
                  </div>
                  <button
                    className={btn}
                    onClick={event => {
                      editTheLink({
                        id: link.id,
                        value: editLink,
                      })
                      event.preventDefault()
                    }}
                  >
                    Update <br />
                    Titel
                  </button>
                </div>
                <div className={updateHyperLinkcont}>
                  <div>
                    <b>
                      <p className={updateHyperLinkShow}>{link.hyperlink}</p>{" "}
                    </b>
                    <input
                      className={editInput}
                      id={`hyperlink${link.id}`}
                      type="url"
                      size="25"
                      style={{ textTransform: "lowercase" }}
                      value={editHyperLink[link]}
                      onChange={handleEditHyperLink}
                      placeholder="bewerk hyperlink"
                      minLength="5"
                      required
                    />
                  </div>
                  <button
                    className={btn}
                    onClick={event => {
                      editTheHyperLink({
                        id: link.id,
                        value: editHyperLink,
                      })
                      event.preventDefault()
                    }}
                  >
                    Update <br /> Hyperlink
                  </button>
                </div>

                <div className={deleteShowcont}>
                  <FaTrash
                    color="black"
                    style={{ cursor: "pointer" }}
                    className={trashBtn}
                    onClick={event => {
                      deleteLink(link)
                      event.preventDefault()
                    }}
                  >
                    Delete Link
                  </FaTrash>
                  <div className={inputCont}>
                    <input
                      type="checkbox"
                      id={`checkbox${link.id}`}
                      checked={link.visible}
                      onChange={e => toggleLink(link, e.target.checked)}
                    />

                    <span className={checkmark}></span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* </div> */}

          <hr
            style={{
              border: "1px solid white",
              opacity: "0.025",
              width: "50%",
              margin: "75px auto",
            }}
            className={mobileHr}
          />

          {/* CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR <-------------------------------------------------------------------------------->  CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR*/}

          <h2 style={{ textAlign: "center" }}>
            <b>
              <u
                style={{
                  color: "white",
                  textDecoration: "underline",
                  textDecorationColor: "grey",
                }}
              >
                Thema's
              </u>
            </b>
          </h2>
          <br />

          <ul className={pickColor}>
            <li className={chooseColor}>
              <label>
                <input
                  type="radio"
                  value="geel"
                  checked={color === "geel"}
                  onChange={onRadioChange}
                  onClick={event => {
                    changeHeadingBg("geel")
                    event.preventDefault()
                  }}
                  style={{ display: "none" }}
                />
                <div id="currentYellow" className={yellowtheme}>
                  <div className={yellowlinks} />
                  <div className={yellowlinks} />
                  <div className={yellowlinks} />
                </div>
              </label>
            </li>

            <li className={chooseColor}>
              <label>
                <input
                  type="radio"
                  value="grijs"
                  checked={color === "grijs"}
                  onChange={onRadioChange}
                  onClick={event => {
                    changeHeadingBg("grijs")
                    event.preventDefault()
                  }}
                  style={{ display: "none" }}
                />
                <div id="currentGrey" className={graytheme}>
                  <div className={graylinks} />
                  <div className={graylinks} />
                  <div className={graylinks} />
                </div>
              </label>
            </li>

            <li className={chooseColor}>
              <label>
                <input
                  type="radio"
                  value="roze"
                  checked={color === "roze"}
                  onChange={onRadioChange}
                  onClick={event => {
                    changeHeadingBg("roze")
                    event.preventDefault()
                  }}
                  style={{ display: "none" }}
                />
                <div id="currentPink" className={pinktheme}>
                  <div className={pinklinks} />
                  <div className={pinklinks} />
                  <div className={pinklinks} />
                </div>
              </label>
            </li>

            <li className={chooseColor}>
              <label>
                <input
                  type="radio"
                  value="zwart"
                  checked={color === "zwart"}
                  onChange={onRadioChange}
                  onClick={event => {
                    changeHeadingBg("zwart")
                    event.preventDefault()
                  }}
                  style={{ display: "none" }}
                />
                <div id="currentBlack" className={blacktheme}>
                  <div className={blacklinks} />
                  <div className={blacklinks} />
                  <div className={blacklinks} />
                </div>
              </label>
            </li>

            <li className={chooseColor}>
              <label>
                <input
                  type="radio"
                  value="bruin"
                  checked={color === "bruin"}
                  onChange={onRadioChange}
                  onClick={event => {
                    changeHeadingBg("bruin")
                    event.preventDefault()
                  }}
                  style={{ display: "none" }}
                />
                <div id="currentBrown" className={browntheme}>
                  <div className={brownlinks} />
                  <div className={brownlinks} />
                  <div className={brownlinks} />
                </div>
              </label>
            </li>

            <li className={chooseColor}>
              <label>
                <input
                  type="radio"
                  value="groen"
                  checked={color === "groen"}
                  onChange={onRadioChange}
                  onClick={event => {
                    changeHeadingBg("groen")
                    event.preventDefault()
                  }}
                  style={{ display: "none" }}
                />
                <div id="currentGreen" className={greentheme}>
                  <div className={greenlinks} />
                  <div className={greenlinks} />
                  <div className={greenlinks} />
                </div>
              </label>
            </li>

            <li className={chooseColor}>
              <label>
                <input
                  type="radio"
                  value="afrotheme"
                  checked={color === "afrotheme"}
                  onChange={onRadioChange}
                  onClick={event => {
                    changeHeadingBg("afrotheme")
                    event.preventDefault()
                  }}
                  style={{ display: "none" }}
                />
                <div id="currentAfro" className={afrospectheme}>
                  <div className={afrospeclinks} />
                  <div className={afrospeclinks} />
                  <div className={afrospeclinks} />
                </div>
              </label>
            </li>
          </ul>
          <br />
          <br />
        </section>

        {/* SLUG LINK SLUG LINK SLUG LINK SLUG LINK SLUG LINK <--------------------------------------------------------------------------------> SLUG LINK SLUG LINK SLUG LINK SLUG LINK SLUG LINK */}

        <aside
          className={`${Adslink}`}
          style={{
            margin: "10px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "0.7em",
            }}
          >
            <div className={usLinkAfro}>
              <b>Afrodiasphere URL</b>
            </div>

            <div className={usLinkSite}>
              <Link
                className={userLink}
                to={`/${slug}`}
              >{`${instURL}/${slug}`}</Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

export default DashboardPage