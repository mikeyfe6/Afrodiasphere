import React from 'react'
// import { Link } from "gatsby"

import Layout from '../components/layout'

import Seo from '../components/seo'

import {
	container,
	grid,
	md,
	lead
} from '../styles/modules/forgetPwd.module.scss'

// import servImage from "../images/mamafrica.png"

import ForgetPassword from '../components/forgetpwd'

const IndexPage = () => (
	<Layout>
		<section>
			<div className={`${container} ${grid}`}>
				<div>
					<h1 className={md}>Wachtwoord vergeten</h1>
					<p
						className={lead}
						style={{ color: '#cc9932', fontSize: '0.8em', margin: '0 0 1em' }}
					>
						Voer hieronder jouw e-mailadres in & je ontvangt een e-mail met
						daarin de verificatiecode voor het resetten van jouw wachtwoord
					</p>
					<ForgetPassword />
				</div>
				{/* <img src={servImage} alt="" className={forgetImg} /> */}
			</div>
		</section>
	</Layout>
)

export default IndexPage

export const Head = () => {
	return <Seo title="Wachtwoord vergeten" />
}
