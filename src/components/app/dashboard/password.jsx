import React from 'react'

import axios from 'axios'

import * as styles from '../../../styles/modules/dashboard/profileInfo.module.scss'

// TODO: add a doublecheck for the right password

const Password = ({
	gatsbyId,
	apiURL,
	token,
	setLoading,
	setError,
	password,
	setPassword
}) => {
	const setPasswordHandler = e => {
		setPassword(e.target.value)
	}

	const submitPassword = async e => {
		e.preventDefault()

		const params = {
			password: password
		}
		try {
			await axios.put(`${apiURL}/api/users/${gatsbyId}`, params, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setError(null)
		} catch {
			setError('Gaat er iets mis met het updaten van je wachtwoord')
			setTimeout(() => setError(null), 5000)
		}
	}

	return (
		<form onSubmit={submitPassword} className={styles.profileInput}>
			<label htmlFor="password"> Wachtwoord </label>
			<input
				onChange={setPasswordHandler}
				value={password}
				placeholder="*********"
				type="password"
				name="password"
				id="password"
				pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
				title="Moet op z'n minst 1 nummer, 1 hoofdletter, 1 klein letter en 8 karakters lang zijn."
				style={{
					cursor: 'pointer'
				}}
			/>

			<button
				// className={`${btn} ${btnSecondary} ${submitBtn}`}
				type="submit"
				title="Sla nieuw wachtwoord op"
				style={{
					paddingTop: '5px',
					paddingBottom: '5px'
				}}
			>
				Update
			</button>
		</form>
	)
}

export default Password
