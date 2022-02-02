import React from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import faqStyles from "../styles/modules/faqStyles.module.scss"

import docsImage from "../images/docs.png"

const Stats = () => {
  return (
    <>
      <section
        className={`${faqStyles.docsHead} ${faqStyles.bgPrimary} ${faqStyles.py3}`}
      >
        <div className={`${faqStyles.container} ${faqStyles.grid}`}>
          <div>
            <h1 className={faqStyles.xl}>Docs</h1>
            <p className={faqStyles.lead}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quo
              quae assumenda.
            </p>
          </div>
          <img src={docsImage} alt="" />
        </div>
      </section>

      <section className={`${faqStyles.docsMain} ${faqStyles.my4}`}>
        <div className={`${faqStyles.container} ${faqStyles.grid}`}>
          <div
            className={`${faqStyles.card} ${faqStyles.bgLight} ${faqStyles.p3}`}
          >
            <h3 className={faqStyles.my2}>Essentials</h3>
            <nav>
              <ul>
                <li>
                  <Link to="#">Intro</Link>
                </li>
                <li>
                  <Link to="#">About</Link>
                </li>
                <li>
                  <Link to="#">Installation</Link>
                </li>
              </ul>
            </nav>

            <h3 className={faqStyles.my2}>Deployment</h3>
            <nav>
              <ul>
                <li>
                  <Link to="#">Netlify</Link>
                </li>
                <li>
                  <Link to="#">Gatsby</Link>
                </li>
                <li>
                  <Link to="#">Heroku</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={faqStyles.card}>
            <h2>Introductie</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              aut blanditiis odio quas, sequi obcaecati, facilis similique nulla
              in fugit dolores sit aliquam, earum omnis facere eos vero illo
              inventore.
            </p>
            <div className={`${faqStyles.alert} ${faqStyles.alertSuccess}`}>
              <FontAwesomeIcon icon="coffee" size="1x" color="#72be72" /> Lorem
              ipsum dolor sit amet consectetur adipisicing elit.
            </div>
            <h3>Lorem, ipsum dolor.</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              exercitationem tempora enim maiores recusandae atque, iusto
              deleniti minus tempore vel dolorum illo nesciunt possimus saepe
              quod odit, inventore mollitia reiciendis.
            </p>
            <Link to="#" className={`${faqStyles.btn} ${faqStyles.btnPrimary}`}>
              Installation
            </Link>
            <h3>requirments</h3>
            <ul>
              <li>Windows 10, Mac, Linux</li>
              <li>WindoNode.jsws 10, Mac, Linux</li>
            </ul>

            <h3> Install</h3>
            <p>Mac (HomeBREW)</p>
            <pre>
              <code>$ brew install loruki-cli</code>
            </pre>
            <p>NPM</p>
            <pre>
              <code>$ npm install loruki-cli</code>
            </pre>
            <p>Yarn</p>
            <pre>
              <code>$ yarn install loruki-cli</code>
            </pre>
          </div>
        </div>
      </section>
    </>
  )
}

export default Stats
