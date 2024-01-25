import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/socials.module.scss'

const TikTok = ({
	apiURL,
	token,
	tkLink,
	setTkLink,
	handleSmLinkChange,
	loadingData
}) => {
	const setTkHandler = e => {
		const newTkLink = e.target.value.toLowerCase()
		setTkLink(newTkLink)

		handleSmLinkChange('tiktok', newTkLink)
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
		<form className={styles.socialField}>
			<div>
				<label htmlFor="tklink">
					<i
						className="fa-brands fa-tiktok fa-xl"
						style={{ color: '#4BE1EB' }}
					/>
					tiktok.com/
				</label>
				<input
					id="tklink"
					name="tklink"
					type="text"
					placeholder="jouwprofiel"
					value={tkLink}
					onChange={setTkHandler}
					disabled={loadingData}
				/>
			</div>
		</form>
	)
}

export default TikTok
