import React, { useState, useRef } from "react"
import axios from "axios"
import { navigate } from "@reach/router"

import { logerror, inputRes } from "../styles/modules/forgetStyles.module.scss"

import { btn, loadingmsg } from "../styles/modules/loginStyles.module.scss"

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

const ForgetPwd = () => {
  const emailResetRef = useRef()

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  const handleSubmitRegister = async e => {
    e.preventDefault()

    try {
      await axios.post(`${apiURL}/api/auth/forgot-password`, {
        email: emailResetRef.current.value,
      })
      setLoading("Aan het laden")
      setError(null)
      navigate("/reset-password")
    } catch {
      setLoading(null)
      setError("Verkeerde invoer, probeer 't opnieuw")
      setTimeout(() => setError(null), 5000)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmitRegister} className={inputRes}>
        <input
          ref={emailResetRef}
          type="email"
          name="emailRes"
          placeholder="email"
          style={{ textTransform: "lowercase" }}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
        <button
          className={`${btn}`}
          style={{
            cursor: "pointer",
            paddingTop: "3px",
            paddingBottom: "3px",
          }}
        >
          Verstuur
        </button>
        {error && <ErrorMessage text={error} />}
        {loading && <LoadingMessage text={loading} />}
      </form>
    </>
  )
}

export default ForgetPwd
