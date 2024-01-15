import React from 'react'
// import { Link } from "gatsby"

import Layout from '../components/layout'

import Seo from '../components/seo'

import * as styles from '../styles/modules/forgetPwd.module.scss'

import mamaAfrica from '../images/mamafrica.png'

import ForgetPassword from '../components/forgetpwd'

const ForgetPwdPage = () => (
	<Layout>
		<section className={styles.forgetPwd}>
			<div>
				<h1 className={styles.md}>Wachtwoord vergeten</h1>
				<p className={styles.lead}>
					Voer hieronder jouw e-mailadres in & je ontvangt een e-mail met daarin
					de verificatiecode voor het resetten van jouw wachtwoord
				</p>
				<ForgetPassword />
			</div>
			<img src={mamaAfrica} alt="" />
		</section>
	</Layout>
)

export default ForgetPwdPage

export const Head = () => {
	return <Seo title="Wachtwoord vergeten" />
}
