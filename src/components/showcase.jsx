import React from "react"
import { Link } from "gatsby"

import showcaseStyles from "../styles/modules/showcaseStyles.module.scss"

const Showcase = () => (
  <section className={showcaseStyles.showcase}>
    <div className={`${showcaseStyles.container} ${showcaseStyles.grid}`}>
      {" "}
      <div className={showcaseStyles.showcaseText}>
        <h1>Jouw profiel zo online!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quia
          culpa dolor cupiditate nemo vitae et ipsam error quo placeat, est in,
          sequi veniam enim ullam quibusdam maiores saepe sint?
        </p>
        <Link
          to="/docs"
          className={`${showcaseStyles.btn} ${showcaseStyles.btnOutline}`}
        >
          Lees Meer
        </Link>
      </div>{" "}
      <div className={`${showcaseStyles.showcaseForm} ${showcaseStyles.card}`}>
        <h2>Request a demo</h2>
        <form action="">
          <div className={showcaseStyles.formControl}>
            <input type="text" name="name" placeholder="Name" />
          </div>
          <div className={showcaseStyles.formControl}>
            <input type="text" name="company" placeholder="Company" />
          </div>
          <div className={showcaseStyles.formControl}>
            <input type="email" name="email" placeholder="Email" />
          </div>
          <input
            type="submit"
            value="Verstuur Form"
            className={`${showcaseStyles.btn} ${showcaseStyles.btnPrimary}`}
          />
        </form>
      </div>
    </div>
  </section>
)

export default Showcase
