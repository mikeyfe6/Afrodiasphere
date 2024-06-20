import React from 'react'
// import { Link } from "gatsby"

import Layout from '../components/layout'

import Seo from '../components/seo'

import * as styles from '../styles/modules/resetPwd.module.scss'

import mamaAfrica from '../images/mamafrica.png'

import ResetPassword from '../components/resetpwd'

const ResetPwdPage = () => (
	<Layout>
		<section className={styles.resetPwd}>
			<div>
				<h1>Nieuw wachtwoord</h1>
				<p>Voer hieronder jouw verificatiecode en een nieuwe wachtwoord in</p>
				<ResetPassword />
			</div>
			<img src={mamaAfrica} alt="" />
		</section>
	</Layout>
)

export default ResetPwdPage

export const Head = () => {
	return <Seo title="Reset wachtwoord" pathname="/wachtwoord-reset/" />
}
