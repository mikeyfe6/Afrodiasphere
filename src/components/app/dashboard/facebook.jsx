import React, { useEffect } from 'react'

import axios from 'axios'

// import * as styles from '../../../styles/modules/avatarStyles.module.scss'

const Facebook = ({
	userId,
	apiURL,
	token,
	setLoading,
	setError,
	fbLink,
	setFbLink
}) => {
	const setFbHandler = e => {
		setFbLink(e.target.value.toLowerCase())
	}

	useEffect(() => {
		let fbhideme = document.getElementById('fbhide')
		!fbLink
			? (fbhideme.style.display = 'none')
			: (fbhideme.style.display = 'block')
	}, [fbLink])

	const submitFB = async e => {
		e.preventDefault()

		const params = {
			facebooklink: fbLink
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
			setError('Gaat iets mis met het updaten van je facebooklink')
			setTimeout(() => setError(null), 5000)
		}
	}

	useEffect(() => {
		const getFbLink = async () => {
			const res = await axios.get(`${apiURL}/api/instanties`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			setFbLink(res.data.facebooklink || '')
		}
		getFbLink()
	}, [token])

	return (
		<form onSubmit={submitFB}>
			<label htmlFor="fblink">
				{/* <FaFacebookF
                  size="1.1em"
                  className={socialIcons}
                  color="#4867AA"
                /> */}
				Facebook
			</label>
			<input
				onChange={setFbHandler}
				value={fbLink}
				type="text"
				name="fblink"
				id="fblink"
				placeholder="jouwprofiel"
			/>
			<button
				type="submit"
				title="Sla Facebook-profiel op"
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

export default Facebook
