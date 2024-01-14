import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../styles/modules/dashboard/biography.module.scss'

const Biography = ({
	userId,
	apiURL,
	token,
	setLoading,
	setError,
	biography,
	setBiography
}) => {
	const setBiografieHandler = e => {
		setBiography(e.target.value)
	}

	const submitBiography = async e => {
		e.preventDefault()

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

			setError(null)
		} catch {
			setError("Updaten van biografie lukt niet, probeer het nog 's")
			setTimeout(() => setError(null), 5000)
		}
	}

	useEffect(() => {
		const getBiography = async () => {
			const res = await axios.get(`${apiURL}/api/instanties`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setBiography(res.data.biografie || '')
		}
		getBiography()
	}, [token])

	return (
		<form onSubmit={submitBiography} className={styles.biography}>
			<label htmlFor="biografie">Biografie</label>
			<textarea
				onChange={setBiografieHandler}
				value={biography}
				type="text"
				maxLength="140"
				name="text"
				id="biografie"
				className={styles.bioInput}
				title="Maximaal 120 karakters"
				placeholder="Voer hier een korte beschrijving in van max 140 tekens.."
			/>

			<button
				// className={btn}
				type="submit"
				title="Sla biografie op"
				style={{
					padding: '5px 0',
					textAlign: 'center'
				}}
			>
				Opslaan
			</button>
		</form>
	)
}

export default Biography