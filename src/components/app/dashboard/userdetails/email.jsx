import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/profileInfo.module.scss'

const Email = ({
	gatsbyId,
	apiURL,
	token,
	setLoading,
	setError,
	email,
	setEmail,
	loadingData
}) => {
	const setEmailHandler = e => {
		setEmail(e.target.value)
	}

	const submitEmail = async e => {
		e.preventDefault()

		const params = {
			email: email
		}
		try {
			await axios.put(`${apiURL}/api/users/${gatsbyId}`, params, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setError(null)
		} catch {
			setError("Updaten van emailadres lukt niet, probeer het nog 's")
			setTimeout(() => setError(null), 5000)
		}
	}

	useEffect(() => {
		if (gatsbyId) {
			try {
				const getEmail = async () => {
					const res = await axios.get(`${apiURL}/api/users/${gatsbyId}`, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
					setEmail(res.data.email || '')
				}
				getEmail()
			} catch {
				setError('Gaat iets mis met het ophalen van je emailadres')
			}
		}
	}, [gatsbyId, token])

	return (
		<form onSubmit={submitEmail} className={styles.profileField}>
			<label htmlFor="email">E-mailadres</label>
			<input
				type="email"
				name="email"
				maxLength="35"
				id="email"
				placeholder="voorbeeld@email.nl"
				pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
				value={email}
				onChange={setEmailHandler}
				disabled={loadingData}
			/>

			<button
				type="submit"
				title="Sla e-mailadres op"
				disabled={setLoading || email === ''}
			>
				Opslaan
			</button>
		</form>
	)
}

export default Email
