import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/socials.module.scss'

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
		<form onSubmit={submitTW} className={styles.socialField}>
			<div>
				<label htmlFor="twlink">
					<i
						className="fa-brands fa-x-twitter fa-xl"
						style={{ color: '#000' }}
					/>
					twitter.com/
				</label>
				<input
					onChange={setTwHandler}
					value={twLink}
					type="text"
					name="twlink"
					placeholder="jouwprofiel"
				/>
			</div>
			<button
				type="submit"
				title="Sla Twitter-profiel op"
				disabled={setLoading || twLink === ''}
			>
				Opslaan
			</button>
		</form>
	)
}

export default Twitter
