import React from "react"
import { Router } from "@reach/router"

import Seo from "../components/seo"

import Layout from "../components/layout"
import PrivateRoute from "../components/admin/PrivateRoute"
import Account from "../components/admin/Account"
import Login from "../components/admin/Login"

const Admin = () => (
  <Layout>
    <Seo title="Login / Registreer" />
    <Router>
      <PrivateRoute component={Account} path="admin/account" />
      <Login path="/admin/login" />
    </Router>
  </Layout>
)
export default Admin
