import React, { useEffect } from 'react'

import axios from 'axios'

// import * as styles from '../../../styles/modules/avatarStyles.module.scss'

const Twitter = ({
	userId,
	apiURL,
	token,
	setLoading,
	setError,
	twLink,
	setTwLink
}) => {
	const setTwHandler = e => {
		setTwLink(e.target.value.toLowerCase())
	}

	useEffect(() => {
		let twhideme = document.getElementById('twhide')
		!twLink
			? (twhideme.style.display = 'none')
			: (twhideme.style.display = 'block')
	}, [twLink])

	const submitTW = async e => {
		e.preventDefault()

		const params = {
			twitterlink: twLink
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
			setError('Gaat iets mis met het updaten van je twitterlink')
			setTimeout(() => setError(null), 5000)
		}
	}

	useEffect(() => {
		const getTwLink = async () => {
			const res = await axios.get(`${apiURL}/api/instanties`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setTwLink(res.data.twitterlink || '')
		}
		getTwLink()
	}, [token])

	return (
		<form onSubmit={submitTW}>
			<label htmlFor="twlink">
				{/* <FaTwitter
                  size="1.1em"
                  className={socialIcons}
                  color="#1FA1F1"
                /> */}
				Twitter
			</label>
			<input
				onChange={setTwHandler}
				value={twLink}
				type="text"
				name="twlink"
				id="twlink"
				placeholder="jouwprofiel"
				// className={socialInput}
			/>
			<button
				type="submit"
				title="Sla Twitter-profiel op"
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

export default Twitter
