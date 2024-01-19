import React, { useRef, useState } from 'react'
import { Link } from 'gatsby'
import axios from 'axios'
import { navigate } from '@reach/router'

import { setUser } from '../../services/auth'

import * as styles from '../../styles/modules/login.module.scss'

import mamaAfrica from '../../images/mamafrica.png'

const apiURL = process.env.GATSBY_BACKEND_URL

const ErrorMessage = ({ text }) => {
	return (
		<div className={styles.logerror}>
			<span>{text}</span>
		</div>
	)
}

const LoadingMessage = ({ text }) => {
	return (
		<div className={styles.loadingmsg}>
			<span>{text}</span>
		</div>
	)
}

const LoginPage = () => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(null)

	const usernameRef = useRef(null)
	const passwordRef = useRef(null)

	const usernameRegRef = useRef(null)
	const emailRegRef = useRef(null)
	const passwordRegRef = useRef(null)

	const signUpHandler = e => {
		const container = document.getElementById('ads-form')
		container.classList.add(styles.rightPanelActive)
		e.preventDefault()
	}

	const signInHandler = e => {
		const container = document.getElementById('ads-form')
		container.classList.remove(styles.rightPanelActive)
		e.preventDefault()
	}

	const handleSubmitLogin = async e => {
		e.preventDefault()

		try {
			const { data } = await axios.post(`${apiURL}/api/auth/local`, {
				identifier: usernameRef.current.value.toLowerCase(),
				password: passwordRef.current.value
			})

			setUser(data)
			setLoading('Aan het laden')
			setError(null)
			navigate('/dashboard/')
		} catch (error) {
			console.error('Login error:', error)

			setLoading(null)
			setError("Verkeerde invoer, probeer 't opnieuw")

			const errorMessage = error.response?.data?.message

			if (errorMessage) {
				setError(errorMessage)
			}

			setTimeout(() => setError(null), 5000)
		}
	}

	const handleSubmitRegister = async e => {
		e.preventDefault()

		try {
			const { data } = await axios.post(`${apiURL}/api/auth/local/register`, {
				username: usernameRegRef.current.value
					.toLowerCase()
					.replace(/\s+/g, ''),
				email: emailRegRef.current.value.toLowerCase().replace(/\s+/g, ''),
				password: passwordRegRef.current.value
			})

			setUser(data)

			const str = usernameRegRef.current.value
			const correctSlug = str
				.normalize('NFD')
				.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '-')

			const params = {
				slug: correctSlug,
				profiel: usernameRegRef.current.value.toLowerCase().replace(/\s+/g, '')
			}

			await axios.post(
				`${apiURL}/api/instanties`,
				{ data: params },
				{
					headers: {
						Authorization: `Bearer ${data.jwt}`
					}
				}
			)

			if (process.env.NODE_ENV === 'production') {
				await axios.post(
					`https://api.netlify.com/build_hooks/61fd35548a7a1a15735fd2b8`
				)
			}

			console.log('Welkom bij Afrodiasphere!')
			setLoading('Aan het laden')
			setError(null)
			navigate('/dashboard/')
		} catch {
			setLoading(null)
			setError("Verkeerde invoer, probeer 't opnieuw")
			setTimeout(() => setError(null), 5000)
		}
	}

	return (
		<section className={styles.login}>
			<div className={styles.header}>
				<h1>Log in / Registeer</h1>
				<img src={mamaAfrica} alt="" />
			</div>

			<div className={styles.superContainer}>
				<div className={styles.container} id="ads-form">
					<div className={`${styles.formContainer} ${styles.signUpContainer}`}>
						<form onSubmit={handleSubmitRegister} noValidate>
							<h3>Maak een ADS-profiel aan</h3>
							<span>
								voer hieronder jouw e-mailadres in, kies een gebruikersnaam en
								een wachtwoord
							</span>
							<input
								ref={usernameRegRef}
								type="text"
								name="usernameReg"
								pattern="[^\s]+"
								style={{ textTransform: 'lowercase' }}
								placeholder="gebruikersnaam"
								title="Kies een gebruikersnaam"
							/>
							<input
								ref={emailRegRef}
								type="email"
								name="emailReg"
								placeholder="e-mailadres"
								style={{ textTransform: 'lowercase' }}
								pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
								title="Voer je e-mailadres in"
							/>
							<input
								ref={passwordRegRef}
								type="password"
								name="passwordreg"
								autoComplete="new-password"
								placeholder="wachtwoord"
								pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
								title="Moet op z'n minst 1 nummer, 1 hoofdletter, 1 klein letter en 8 karakters lang zijn."
							/>

							{error && <ErrorMessage text={error} />}
							{loading && <LoadingMessage text={loading} />}
							<button title="Registreer">Registeer</button>
						</form>
					</div>
					<div className={`${styles.formContainer} ${styles.signInContainer}`}>
						<form onSubmit={handleSubmitLogin} noValidate>
							<h3>Inloggen</h3>
							<span>.. met jouw ADS-profiel</span>
							<input
								ref={usernameRef}
								pattern="[^\s]+"
								type="text"
								name="username"
								placeholder="e-mailadres / gebruikersnaam"
								style={{ textTransform: 'lowercase' }}
								title="Log in met jouw e-mailadres of gebruikersnaam"
								required
							/>
							<input
								ref={passwordRef}
								type="password"
								name="password"
								placeholder="wachtwoord"
								title="Voer jouw wachtwoord in"
								required
							/>
							{error && <ErrorMessage text={error} />}
							{loading && <LoadingMessage text={loading} />}
							<Link
								to="/wachtwoord-vergeten/"
								className={styles.forgetLink}
								title="Ik ben mijn wachtwoord vergeten"
							>
								Wachtwoord vergeten
							</Link>

							<button title="Inloggen">Inloggen</button>
						</form>
					</div>
					<div className={styles.overlayContainer}>
						<div className={styles.overlay}>
							<div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
								<h2 className={styles.overlayTitle}>Welkom</h2>
								<p className={styles.overlayText}>
									<b>Hi!</b> Join the movement! <br />
									<br /> Registreer hier jouw eigen "ADS-profiel" en voeg jouw
									bedrijf binnen no-time toe aan het
									Afrodiasphere-netwerkendomein. <br />
									<br />
									Al een profiel? <strong>Klik hieronder..</strong>
								</p>

								<button
									onClick={signInHandler}
									className={styles.mirror}
									title="Open tablad voor inloggen"
								>
									Naar 'Inloggen'
								</button>
							</div>
							<div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
								<h2 className={styles.overlayTitle}>Welkom Terug</h2>
								<p className={styles.overlayText}>
									Maak optimaal gebruik van de webapp! <br />
									<br />
									Deze kan je downloaden en plaatsen op het beginscherm van jouw
									favoriete toestel. Zo blijf je altijd up-to-date met de
									nieuwste ontwikkelingen.
									<br />
									<br />
									Nog <u>geen</u> profiel? <strong>Klik hieronder..</strong>
								</p>

								<button
									className={styles.mirror}
									onClick={signUpHandler}
									title="Open tablad voor registreren"
								>
									Naar 'Registreren'
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default LoginPage
