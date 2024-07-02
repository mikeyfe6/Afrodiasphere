import React, { useState, useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/profileInfo.module.scss'

const Email = ({
	gatsbyId,
	apiURL,
	token,
	setSuccess,
	email,
	setEmail,
	loadingData,
	setValidationMessage
}) => {
	const [initialValue, setInitialValue] = useState(email)
	const [validationError, setValidationError] = useState(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (!initialValue) {
			setInitialValue(email)
		}
	})

	const setEmailHandler = e => {
		setEmail(e.target.value.toLowerCase())
		setValidationError(null)
		setValidationMessage(null)
	}

	const validateInput = value => {
		if (value.length < 2) {
			const errorMessage = 'Minstens 2 karakters'
			setValidationError(errorMessage)
			setValidationMessage(errorMessage)
			return false
		}
		const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

		if (!regex.test(value)) {
			const errorMessage = 'Voer een geldig e-mailadres in.'
			setValidationError(errorMessage)
			setValidationMessage(errorMessage)
			return false
		}

		setValidationError(null)
		setValidationMessage(null)
		return true
	}

	const submitEmail = async e => {
		e.preventDefault()

		if (!validateInput(email)) {
			return
		}

		setIsSubmitting(true)

		const params = {
			email: email
		}
		try {
			await axios.put(`${apiURL}/api/users/${gatsbyId}`, params, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			setSuccess('Emailadres succesvol geüpdatet')
			setTimeout(() => setSuccess(null), 5000)
			setInitialValue(email)
		} catch (error) {
			console.error('Error updating email:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={submitEmail} className={styles.profileField} noValidate>
			<label htmlFor="email">E-mailadres</label>
			<input
				id="email"
				type="email"
				name="email"
				placeholder="voorbeeld@email.nl"
				value={email}
				onChange={setEmailHandler}
				disabled={loadingData || isSubmitting}
				style={{ color: validationError ? '#CA231E' : 'inherit' }}
			/>

			<button
				type="submit"
				title="Sla e-mailadres op"
				disabled={email === initialValue || isSubmitting}
			>
				Opslaan
			</button>
		</form>
	)
}

export default Email
