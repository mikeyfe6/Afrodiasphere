import React from "react"
// import { Link } from "gatsby"

import { footerCont } from "../styles/modules/footerStyles.module.scss"

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Footer = () => (
  <footer>
    <div className={footerCont}>
      Copyright {new Date().getFullYear()} © ・ Powered by{" "}
      <a href="https://menefex.nl" rel="noopener noreferrer" target="_blank">
        {""}
        <b> Menefex </b>
      </a>
      <img
        src="https://i.postimg.cc/rsf0PJv0/Gx-FAVICON-X.png"
        alt=""
        style={{ width: "25px" }}
      />
    </div>
  </footer>
)

export default Footer
