import React from 'react'

import { Link } from 'gatsby'

import * as styles from '../styles/modules/home.module.scss'

import servImage from '../images/mamafrica.png'

const Intro = () => (
	<section className={`${styles.container} ${styles.grid}`}>
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
						style={{
							padding: '1.5px 17.5px 0px 17.5px',
							color: '#0e0e0e',
							backgroundColor: '#cc9932'
						}}
					>
						hier
					</button>
				</Link>{' '}
				om in te loggen <span style={{ color: '#cc9932' }}>/</span>{' '}
				registreren..
			</p>
		</div>
		<img src={servImage} alt="" />
	</section>
)

export default Intro
