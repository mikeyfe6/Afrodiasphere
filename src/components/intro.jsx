import React from 'react'

import { Link } from 'gatsby'

import * as styles from '../styles/modules/intro.module.scss'

import mamaAfrica from '../images/mamafrica.png'

const Intro = () => (
	<section className={styles.intro}>
		<div>
			<h1 className={styles.xl}>Afrodiasphere</h1>
			<p className={styles.lead}>
				<small style={{ color: '#ababab' }}>JOIN THE MOVEMENT !</small> <br />{' '}
				Klik{' '}
				<Link to="/login/">
					<button
						className={styles.btn}
						title="Ga naar inloggen / registreren"
						type="button"
					>
						hier
					</button>
				</Link>{' '}
				om in te loggen <span style={{ color: '#cc9932' }}>/</span>{' '}
				registreren..
			</p>
		</div>
		<img src={mamaAfrica} alt="" />
	</section>
)

export default Intro
