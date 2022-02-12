import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

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
            <Link to="/app/login">Login</Link>
          </li>
          <li>
            <Link to="/app/dashboard">Dashboard</Link>
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
