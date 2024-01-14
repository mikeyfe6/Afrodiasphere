import React, { useEffect } from 'react'

import axios from 'axios'

// import * as styles from '../../../styles/modules/avatarStyles.module.scss'

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

	useEffect(() => {
		let ighideme = document.getElementById('ighide')
		!igLink
			? (ighideme.style.display = 'none')
			: (ighideme.style.display = 'block')
	}, [igLink])

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
		<form onSubmit={submitIG}>
			<label htmlFor="iglink">
				{/* <FaInstagram
                  size="1.1em"
                  className={socialIcons}
                  color="#F81F58"
                /> */}
				Instagram
			</label>

			<input
				onChange={setIgHandler}
				value={igLink}
				type="text"
				name="iglink"
				id="iglink"
				placeholder="jouwprofiel"
				// className={socialInput}
			/>

			<button
				// className={btn}
				type="submit"
				title="Sla Instagram-profiel op"
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

export default Instagram
