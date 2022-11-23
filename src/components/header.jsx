import PropTypes from "prop-types"
import React from "react"
import { Link, navigate } from "gatsby"

import { isLoggedIn, logout, isBrowser } from "../services/auth"

import {
  navbar,
  flex,
  container,
} from "../styles/modules/headerStyles.module.scss"

import AfroLogo from "../assets/Afrodiasphere-logo.svg"

// console.log(localStorage.getItem("gatsbyUser"))

// console.log(getUser().user.username)

const Header = () => (
  <header className={navbar}>
    <div className={`${container} ${flex}`}>
      <Link to="/" title="Ga naar homepagina">
        <AfroLogo fill="#cc9932" width="75" />
      </Link>

      <nav>
        <ul>
          {/* <li>
            <Link to="/">Home</Link>
          </li> */}
          <li>
            {isLoggedIn() && isBrowser() ? (
              <button
                activeStyle={{ color: "#cc9932" }}
                onClick={e => {
                  e.preventDefault()
                  // e.stopPropagation()
                  logout(() => navigate("/app/login"))
                }}
                href="#"
                title="Uitloggen"
              >
                Log uit
              </button>
            ) : (
              <Link
                to="/app/login/"
                title="Inloggen"
                activeStyle={{ color: "#cc9932" }}
              >
                Inloggen
              </Link>
            )}
          </li>
          <li>
            <Link
              to="/app/dashboard/"
              activeStyle={{ color: "#cc9932" }}
              title="Dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <a
              href="https://menefex.nl"
              rel="noopener noreferrer"
              target="_blank"
              title="MenefexWMB"
            >
              <strong>
                <i>MF</i>
              </strong>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
