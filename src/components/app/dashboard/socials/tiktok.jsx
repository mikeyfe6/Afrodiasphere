import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/socials.module.scss'

const TikTok = ({
	userId,
	apiURL,
	token,
	setLoading,
	setError,
	tkLink,
	setTkLink
}) => {
	const setTkHandler = e => {
		setTkLink(e.target.value.toLowerCase())
	}

	const submitTK = async e => {
		e.preventDefault()

		const params = {
			tiktoklink: tkLink
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
			setError('Gaat iets mis met het updaten van je tiktoklink')
			setTimeout(() => setError(null), 5000)
		}
	}

	useEffect(() => {
		const getTkLink = async () => {
			const res = await axios.get(`${apiURL}/api/instanties`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setTkLink(res.data.tiktoklink || '')
		}
		getTkLink()
	}, [token])

	return (
		<form onSubmit={submitTK} className={styles.socialField}>
			<label htmlFor="tklink">
				<i className="fa-brands fa-tiktok fa-xl" style={{ color: '#4BE1EB' }} />
				tiktok.com/
			</label>
			<input
				onChange={setTkHandler}
				value={tkLink}
				type="text"
				name="tklink"
				placeholder="jouwprofiel"
			/>
			<button type="submit" title="Sla TikTok-profiel op">
				Opslaan
			</button>
		</form>
	)
}

export default TikTok
