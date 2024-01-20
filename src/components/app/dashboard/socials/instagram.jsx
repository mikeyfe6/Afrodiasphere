import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/socials.module.scss'

const Instagram = ({
	userId,
	apiURL,
	token,
	setLoading,
	setError,
	igLink,
	setIgLink
}) => {
	const setIgHandler = e => {
		setIgLink(e.target.value.toLowerCase())
	}

	const submitIG = async e => {
		e.preventDefault()

		const params = {
			instagramlink: igLink
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
			setError('Gaat iets mis met het updaten van je instagramlink')
			setTimeout(() => setError(null), 5000)
		}
	}

	useEffect(() => {
		const getIgLink = async () => {
			const res = await axios.get(`${apiURL}/api/instanties`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setIgLink(res.data.instagramlink || '')
		}
		getIgLink()
	}, [token])

	return (
		<form onSubmit={submitIG} className={styles.socialField}>
			<div>
				<label htmlFor="iglink">
					<i
						className="fa-brands fa-instagram fa-xl"
						style={{ color: '#F81F58' }}
					/>
					instagram.com/
				</label>

				<input
					onChange={setIgHandler}
					value={igLink}
					type="text"
					name="iglink"
					placeholder="jouwprofiel"
				/>
			</div>
			<button type="submit" title="Sla Instagram-profiel op">
				Opslaan
			</button>
		</form>
	)
}

export default Instagram
