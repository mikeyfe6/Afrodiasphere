import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import {
  navbar,
  flex,
  container,
} from "../styles/modules/headerStyles.module.scss"

import afroLogo from "../../static/afroadiaspheretest.png"

const Header = () => (
  <header className={navbar}>
    <div className={`${container} ${flex}`}>
      <Link to="/">
        <img src={afroLogo} alt="" style={{ width: "35px" }} />
      </Link>
      <nav>
        <ul>
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
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin/login">Login</Link>
          </li>
          <li>
            <Link to="/admin/account">Account</Link>
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
