import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/socials.module.scss'

const Facebook = ({
	apiURL,
	token,
	fbLink,
	setFbLink,
	handleSmLinkChange,
	loadingData
}) => {
	const setFbHandler = e => {
		const newFbLink = e.target.value.toLowerCase()
		setFbLink(newFbLink)

		handleSmLinkChange('facebook', newFbLink)
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
		<form className={styles.socialField}>
			<div>
				<label htmlFor="fblink">
					<i
						className="fa-brands fa-facebook-f fa-xl"
						style={{ color: '#4867AA' }}
					/>
					facebook.com/
				</label>
				<input
					id="fblink"
					name="fblink"
					type="text"
					placeholder="jouwprofiel"
					value={fbLink}
					onChange={setFbHandler}
					disabled={loadingData}
				/>
			</div>
		</form>
	)
}

export default Facebook
