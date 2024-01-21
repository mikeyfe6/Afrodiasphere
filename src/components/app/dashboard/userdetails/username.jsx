import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/profileInfo.module.scss'

const Username = ({
	gatsbyId,
	apiURL,
	token,
	setLoading,
	setError,
	username,
	setUsername
}) => {
	const setUsernameHandler = e => {
		setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))
	}

	const submitUsername = async e => {
		e.preventDefault()

		const params = {
			username: username
		}
		try {
			await axios.put(`${apiURL}/api/users/${gatsbyId}`, params, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setError(null)
		} catch {
			setError("Updaten van gebruikersnaam lukt niet, probeer het nog 's")
			setTimeout(() => setError(null), 5000)
		}
	}

	useEffect(() => {
		try {
			const getUsername = async () => {
				const res = await axios.get(`${apiURL}/api/users/${gatsbyId}`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				setUsername(res.data.username || '')
			}
			getUsername()
		} catch {
			console.log('Gaat iets mis met het ophalen van je gebruikersnaam')
			logout(() => navigate('/login'))
		}
	}, [gatsbyId, token])

	return (
		<form onSubmit={submitUsername} className={styles.profileField}>
			<label htmlFor="username">Gebruikersnaam</label>
			<input
				onChange={setUsernameHandler}
				value={username}
				type="text"
				maxLength="25"
				name="username"
				id="username"
				pattern="[^\s]+"
				title="Geen spaties"
			/>
			<button type="submit" title="Sla gebruikersnaam op">
				Opslaan
			</button>
		</form>
	)
}

export default Username
