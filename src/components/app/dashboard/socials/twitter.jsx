import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/socials.module.scss'

const Twitter = ({ apiURL, token, twLink, setTwLink, handleSmLinkChange }) => {
	const setTwHandler = e => {
		const newTwLink = e.target.value.toLowerCase()
		setTwLink(newTwLink)

		handleSmLinkChange('twitter', newTwLink)
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
		<form className={styles.socialField}>
			<div>
				<label htmlFor="twlink">
					<i
						className="fa-brands fa-x-twitter fa-xl"
						style={{ color: '#000' }}
					/>
					twitter.com/
				</label>
				<input
					id="twlink"
					name="twlink"
					type="text"
					placeholder="jouwprofiel"
					value={twLink}
					onChange={setTwHandler}
				/>
			</div>
		</form>
	)
}

export default Twitter
