import React, { useState, useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/profileInfo.module.scss'

const Telephone = ({
	userId,
	apiURL,
	token,
	setSuccess,
	telephone,
	setTelephone,
	loadingData,
	setValidationMessage
}) => {
	const [initialValue, setInitialValue] = useState(telephone)
	const [validationError, setValidationError] = useState(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (!initialValue) {
			setInitialValue(telephone)
		}
	})

	const setTelephoneHandler = e => {
		setTelephone(e.target.value)
		setValidationError(null)
		setValidationMessage(null)
	}

	const validateInput = value => {
		if (value.length < 9) {
			const errorMessage = 'Minstens 9 karakters'
			setValidationError(errorMessage)
			setValidationMessage(errorMessage)
			return false
		}
		const regex = /^(\+31|0)(\s|-)?(6\s?\d{8}|[1-9]\d\s?\d{6,7})$/

		if (!regex.test(value)) {
			const errorMessage = 'Vul een valide telefoonnummer in.'
			setValidationError(errorMessage)
			setValidationMessage(errorMessage)
			return false
		}

		setValidationError(null)
		setValidationMessage(null)
		return true
	}

	const submitTelephone = async e => {
		e.preventDefault()

		if (!validateInput(telephone)) {
			return
		}

		setIsSubmitting(true)

		const params = {
			telephone: telephone
		}
		try {
			await axios.put(
				`${apiURL}/api/instanties/${userId}`,
				{ data: params },
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)

			setSuccess('Telefoonnummer succesvol geüpdatet')
			setTimeout(() => setSuccess(null), 5000)
			setInitialValue(telephone)
		} catch (error) {
			console.error('Error updating telephone:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={submitTelephone} className={styles.profileField} noValidate>
			<label htmlFor="telephone">Telefoonnummer</label>
			<input
				id="telephone"
				type="text"
				name="telephone"
				placeholder="bijv. +31628213134"
				value={telephone}
				onChange={setTelephoneHandler}
				disabled={loadingData || isSubmitting}
				style={{ color: validationError ? '#CA231E' : 'inherit' }}
			/>
			<button
				type="submit"
				title="Sla telefoonnummer op"
				disabled={telephone === initialValue || isSubmitting}
			>
				<i className="fa-solid fa-floppy-disk fa-lg" />
			</button>
		</form>
	)
}

export default Telephone
