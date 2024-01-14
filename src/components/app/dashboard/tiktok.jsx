import React, { useEffect } from 'react'

import axios from 'axios'

// import * as styles from '../../../styles/modules/avatarStyles.module.scss'

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

	useEffect(() => {
		let tkhideme = document.getElementById('tkhide')
		!tkLink
			? (tkhideme.style.display = 'none')
			: (tkhideme.style.display = 'block')
	}, [tkLink])

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
		<form onSubmit={submitTK}>
			<label htmlFor="tklink">
				{/* <SiTiktok size="1.1em" className={socialIcons} color="#4BE1EB" /> */}
				TikTok
			</label>
			<input
				onChange={setTkHandler}
				value={tkLink}
				type="text"
				name="tklink"
				id="tklink"
				placeholder="jouwprofiel"
				// className={socialInput}
			/>
			<button
				// className={btn}
				type="submit"
				title="Sla TikTok-profiel op"
				style={{
					paddingTop: '5px',
					paddingBottom: '5px'
				}}
			>
				Opslaan
			</button>
		</form>
	)
}

export default TikTok