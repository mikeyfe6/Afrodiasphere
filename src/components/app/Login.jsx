import React, { useState, useRef } from "react"
import { Link } from "gatsby"
import axios from "axios"
import { navigate } from "@reach/router"

// import useDigitInput from "react-digit-input"

// import SEO from "../seo"
import { setUser } from "../../services/auth"

import {
  logerror,
  loadingmsg,
  rightPanelActive,
  docsHead,
  bgPrimary,
  py3,
  container,
  grid,
  xl,
  superContainer,
  formContainer,
  signInContainer,
  signUpContainer,
  // storeCode,
  overlayContainer,
  overlay,
  overlayPanel,
  overlayLeft,
  signUpTitle,
  signUpText,
  ghost,
  overlayRight,
  imgHide,
  forgetLink,
} from "../../styles/modules/loginStyles.module.scss"

import servImage from "../../images/mamafrica.png"

// import afroLogo from ""

const apiURL = process.env.GATSBY_BASE_URL

const ErrorMessage = ({ text }) => {
  return (
    <div className={logerror}>
      <span>{text}</span>
    </div>
  )
}

const LoadingMessage = ({ text }) => {
  return (
    <div className={loadingmsg}>
      <span>{text}</span>
    </div>
  )
}

const LoginPage = () => {
  // const vericode = useStaticQuery(graphql`
  //   query Yooo {
  //     allStrapiYooo {
  //       edges {
  //         node {
  //           storecode
  //         }
  //       }
  //     }
  //   }
  // `)

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  const usernameRef = useRef()
  const passwordRef = useRef()

  const usernameRegRef = useRef()
  const emailRegRef = useRef()
  const passwordRegRef = useRef()

  // const [value, onChange] = useState("")
  // const digits = useDigitInput({
  //   acceptedCharacters: /^[0-9]$/,
  //   length: 7,
  //   value,
  //   onChange,
  // })

  // const signUpButton = document.getElementById("signUp")
  // const signInButton = document.getElementById("signIn")

  const signUpHandler = e => {
    const container = document.getElementById("container")
    container.classList.add(rightPanelActive)
    e.preventDefault()
  }

  const signInHandler = e => {
    const container = document.getElementById("container")
    container.classList.remove(rightPanelActive)
    e.preventDefault()
  }

  const handleSubmitLogin = async e => {
    e.preventDefault()

    try {
      const { data } = await axios.post(`${apiURL}/api/auth/local`, {
        identifier: usernameRef.current.value.toLowerCase(),
        password: passwordRef.current.value,
      })

      setUser(data)
      setLoading("Aan het laden")
      setError(null)
      navigate("/app/dashboard")
    } catch {
      setLoading(null)
      setError("Verkeerde invoer, probeer 't opnieuw")
      setTimeout(() => setError(null), 5000)
    }
  }

  const handleSubmitRegister = async e => {
    e.preventDefault()

    // let afrocodes = vericode.allStrapiAfrocode.edges.map(
    //   edge => edge.node.storecode
    // )

    // if (afrocodes.includes(value)) {
    try {
      const { data } = await axios.post(`${apiURL}/api/auth/local/register`, {
        username: usernameRegRef.current.value
          .toLowerCase()
          .replace(/\s+/g, ""),
        email: emailRegRef.current.value.toLowerCase().replace(/\s+/g, ""),
        password: passwordRegRef.current.value,
      })

      setUser(data)

      const params = {
        profiel: usernameRegRef.current.value,
        slug: usernameRegRef.current.value,
      }

      await axios.post(
        `${apiURL}/api/instanties`,
        { data: params },
        {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        }
      )

      await axios.post(
        `https://api.netlify.com/build_hooks/61fd35548a7a1a15735fd2b8`
      )

      console.log("Welkom bij Afrodiasphere!")
      setLoading("Aan het laden")
      setError(null)
      navigate("/app/dashboard")
    } catch {
      setLoading(null)
      setError("Verkeerde invoer, probeer 't opnieuw")
      setTimeout(() => setError(null), 5000)
    }
    // } else {
    //   setError("Vul alle velden correct in!")
    //   setTimeout(() => setError(null), 5000)
    // }
  }

  return (
    <>
      <section className={`${docsHead} ${bgPrimary} ${py3}`}>
        <div className={`${container} ${grid}`}>
          <div>
            <h1 className={xl}>Login / Register</h1>
          </div>
          <img src={servImage} alt="" className={imgHide} />
        </div>
      </section>

      <div className={superContainer}>
        <div className={container} id="container">
          <div className={`${formContainer} ${signUpContainer}`}>
            {/* <img
              src={afroLogo}
              alt=""
              style={{
                width: "50%",
                display: "block",
                margin: "50% auto",
              }}
            /> */}
            <form onSubmit={handleSubmitRegister}>
              <h1 style={{ fontSize: "1.5em" }}> Maak een account aan</h1>
              {/* <div className={loginStyles.socialContainer}>
                <a href="" className="social">
                  <i>icon</i>
                </a>
                <a href="" className="social">
                  <i>icon</i>
                </a>
                <a href="" className="social">
                  <i>icon</i>
                </a>
              </div> */}
              <span>vul je email/adress in en kies een wachtwoord</span>
              <input
                ref={usernameRegRef}
                type="text"
                name="usernameReg"
                pattern="[^\s]+"
                style={{ textTransform: "lowercase" }}
                placeholder="gebruikersnaam"
              />
              <input
                ref={emailRegRef}
                type="email"
                name="emailReg"
                placeholder="email"
                style={{ textTransform: "lowercase" }}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
              <input
                ref={passwordRegRef}
                type="password"
                name="passwordreg"
                placeholder="wachtwoord"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Moet op z'n minst 1 nummer, 1 hoofdletter, 1 klein letter en 8 karakters lang zijn."
              />

              {/* <div
                className={storeCode}
                style={{
                  display: "flex",
                  gap: "7.5px",
                }}
              >
                <input inputMode="decimal" {...digits[0]} />
                <input inputMode="decimal" {...digits[1]} />
                <input inputMode="decimal" {...digits[2]} />
                <input inputMode="decimal" {...digits[3]} />
                <input inputMode="decimal" {...digits[4]} />
                <input inputMode="decimal" {...digits[5]} />
                <input inputMode="decimal" {...digits[6]} />
              </div>
              <b>
                <span>* storecode verplicht</span>
              </b> */}

              {/* <pre>
                <code>"{value}"</code>
              </pre> */}
              {error && <ErrorMessage text={error} />}
              {loading && <LoadingMessage text={loading} />}
              <button style={{ cursor: "pointer" }}>Sign Up</button>
            </form>
          </div>
          <div className={`${formContainer} ${signInContainer}`}>
            <form onSubmit={handleSubmitLogin}>
              <h1> Inloggen </h1>
              {/* <div className={loginStyles.socialContainer}>
                <a href="" className="social">
                  <i>icon</i>
                </a>
                <a href="" className="social">
                  <i>icon</i>
                </a>
                <a href="" className="social">
                  <i>icon</i>
                </a>
              </div> */}
              <span>met jouw account</span>
              <input
                ref={usernameRef}
                type="text"
                name="username"
                placeholder="email / gebruikersnaam"
                style={{ textTransform: "lowercase" }}
                required
              />
              <input
                ref={passwordRef}
                type="password"
                name="password"
                placeholder="wachtwoord"
                required
              />
              {error && <ErrorMessage text={error} />}
              {loading && <LoadingMessage text={loading} />}
              <Link to="/forget-password" className={forgetLink}>
                Wachtwoord vergeten
              </Link>
              <button style={{ cursor: "pointer" }}>Log in</button>
              <br />
            </form>
          </div>
          <div className={overlayContainer}>
            <div className={overlay}>
              <div className={`${overlayPanel} ${overlayLeft}`}>
                <h1 className={signUpTitle}>Welkom</h1>
                <p className={signUpText}>
                  Hier kan je je registeren <br />
                  <br /> Lorem ipsum dolor, sit amet consectetur adipisicing
                  elit. Maiores nihil corporis dolores eaque delectus. <br />
                  <br />
                  Al een account? klik hieronder..
                </p>

                <button
                  style={{ cursor: "pointer" }}
                  className={ghost}
                  id="signIn"
                  onClick={signInHandler}
                >
                  Naar 'Inloggen'
                </button>
              </div>
              <div className={`${overlayPanel} ${overlayRight}`}>
                <h1 className={signUpTitle}>Welkom Terug</h1>
                <p className={signUpText}>
                  Hier kan je inloggen <br />
                  <br />
                  Lorem ipsum dolor sit amet consectetur apersonal info Lorem,
                  ipsum dolor sit amet consectetur adipisicing elit. <br />
                  <br />
                  Nog geen account? Klik hieronder..
                </p>
                <button
                  style={{ cursor: "pointer" }}
                  className={ghost}
                  id="signUp"
                  onClick={signUpHandler}
                >
                  Naar 'Registreren'
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage