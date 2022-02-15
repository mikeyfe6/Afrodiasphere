import React from "react"

import "../styles/modules/footerStyles.module.scss"

import menefexLogo from "../images/menefex-icon.png"

const Footer = () => (
  <footer>
    Copyright {new Date().getFullYear()} © ・ Powered by{" "}
    <a href="https://menefex.nl" rel="noopener noreferrer" target="_blank">
      {""}
      <b> Menefex </b>
    </a>
    <img src={menefexLogo} alt="menefex logo" style={{ width: "25px" }} />
  </footer>
)

export default Footer
