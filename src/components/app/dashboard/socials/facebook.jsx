import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/socials.module.scss'

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
		<form onSubmit={submitFB} className={styles.socialField}>
			<div>
				<label htmlFor="fblink">
					<i
						className="fa-brands fa-facebook-f fa-xl"
						style={{ color: '#4867AA' }}
					/>
					facebook.com/
				</label>
				<input
					onChange={setFbHandler}
					value={fbLink}
					type="text"
					name="fblink"
					placeholder="jouwprofiel"
				/>
			</div>
			<button
				type="submit"
				title="Sla Facebook-profiel op"
				disabled={setLoading || fbLink === ''}
			>
				Opslaan
			</button>
		</form>
	)
}

export default Facebook
