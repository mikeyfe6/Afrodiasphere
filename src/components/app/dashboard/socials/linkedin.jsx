import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/socials.module.scss'

const Linkedin = ({
	apiURL,
	token,
	liLink,
	setLiLink,
	handleSmLinkChange,
	loadingData
}) => {
	const setLiHandler = e => {
		const newLiLink = e.target.value.toLowerCase()
		setLiLink(newLiLink)

		handleSmLinkChange('linkedin', newLiLink)
	}

	useEffect(() => {
		const getLiLink = async () => {
			const res = await axios.get(`${apiURL}/api/instanties`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			setLiLink(res.data.linkedinlink || '')
		}
		getLiLink()
	}, [token])

	return (
		<form className={styles.socialField}>
			<div>
				<label htmlFor="lilink">
					<i
						className="fa-brands fa-linkedin fa-xl"
						style={{ color: '#0366C3' }}
					/>
					linkedin.com/
				</label>
				<input
					id="lilink"
					name="lilink"
					type="text"
					placeholder="jouwprofiel"
					value={liLink}
					onChange={setLiHandler}
					disabled={loadingData}
				/>
			</div>
		</form>
	)
}

export default Linkedin
