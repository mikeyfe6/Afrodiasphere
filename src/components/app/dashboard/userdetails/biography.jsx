import React, { useState, useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/biography.module.scss'

const Biography = ({
	userId,
	apiURL,
	token,
	setSuccess,
	biography,
	setBiography,
	loadingData,
	setValidationMessage
}) => {
	const [initialValue, setInitialValue] = useState(biography)
	const [validationError, setValidationError] = useState(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const setBiografieHandler = e => {
		setBiography(e.target.value)
		setValidationError(null)
		setValidationMessage(null)
	}

	const validateInput = value => {
		if (value.length > 160) {
			const errorMessage = 'Maximaal 160 karakters'
			setValidationError(errorMessage)
			setValidationMessage(errorMessage)
			return false
		}

		setValidationError(null)
		setValidationMessage(null)
		return true
	}

	const submitBiography = async e => {
		e.preventDefault()

		if (!validateInput(biography)) {
			return
		}

		setIsSubmitting(true)
		setInitialValue(biography)

		const params = {
			biografie: biography
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

			setSuccess('Biografie succesvol geüpdatet')
			setTimeout(() => setSuccess(null), 5000)
		} catch (error) {
			console.error('Error updating biography:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	useEffect(() => {
		const getBiography = async () => {
			const res = await axios.get(`${apiURL}/api/instanties`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setBiography(res.data.biografie)
			setInitialValue(res.data.biografie)
		}
		getBiography()
	}, [token])

	return (
		<form onSubmit={submitBiography} className={styles.biography}>
			<label htmlFor="biografie">Biografie</label>
			<textarea
				id="biografie"
				type="text"
				name="text"
				placeholder="Voer hier een korte beschrijving in van max 160 tekens.."
				value={biography || ''}
				onChange={setBiografieHandler}
				disabled={loadingData || isSubmitting}
				style={{ color: validationError ? '#CA231E' : 'inherit' }}
			/>
			<span>{biography ? biography.length : 0} / 160</span>
			<button
				type="submit"
				title="Sla biografie op"
				disabled={biography === initialValue || isSubmitting}
			>
				Opslaan
			</button>
		</form>
	)
}

export default Biography
