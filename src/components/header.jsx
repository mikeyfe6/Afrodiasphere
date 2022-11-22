import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import { isLoggedIn } from "../services/auth"

import {
  navbar,
  flex,
  container,
} from "../styles/modules/headerStyles.module.scss"

import AfroLogo from "../assets/Afrodiasphere-logo.svg"

const Header = () => (
  <header className={navbar}>
    <div className={`${container} ${flex}`}>
      <Link to="/">
        <AfroLogo fill="#cc9932" width="75" />
      </Link>

      <nav>
        <ul>
          {/* <li>
            <Link to="/">Home</Link>
          </li> */}
          <li>
            {isLoggedIn() ? (
              <Link to="/app/login" activeStyle={{ color: "#cc9932" }}>
                Log Out
              </Link>
            ) : (
              <Link to="/app/login">Log In</Link>
            )}
          </li>
          <li>
            <Link to="/app/dashboard" activeStyle={{ color: "#cc9932" }}>
              Dashboard
            </Link>
          </li>
          <li>
            <a
              href="https://menefex.nl"
              rel="noopener noreferrer"
              target="_blank"
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
