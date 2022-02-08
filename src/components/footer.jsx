import React from "react"

import "../styles/modules/footerStyles.module.scss"

const Footer = () => (
  <footer>
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
  </footer>
)

export default Footer
