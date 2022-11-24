import React from "react"
import { Router } from "@reach/router"

import Seo from "../components/seo"

import Layout from "../components/layout"
import PrivateRoute from "../components/app/PrivateRoute"
import Dashboard from "../components/app/Dashboard"
import Login from "../components/app/Login"

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute component={Dashboard} path="app/dashboard" />
      <Login path="/app/login" />
    </Router>
  </Layout>
)
export default App

export const Head = () => {
  return <Seo title="Login / Registreer" />
}
