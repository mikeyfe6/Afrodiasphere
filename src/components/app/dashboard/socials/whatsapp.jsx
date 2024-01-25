import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/socials.module.scss'

const Whatsapp = ({
	apiURL,
	token,
	waLink,
	setWaLink,
	handleSmLinkChange,
	loadingData
}) => {
	const setWaHandler = e => {
		const newWaLink = e.target.value.toLowerCase()
		setWaLink(newWaLink)

		handleSmLinkChange('whatsapp', newWaLink)
	}

	useEffect(() => {
		const getWaLink = async () => {
			const res = await axios.get(`${apiURL}/api/instanties`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setWaLink(res.data.whatsapplink || '')
		}
		getWaLink()
	}, [token])

	return (
		<form className={styles.socialField}>
			<div>
				<label htmlFor="walink">
					<i
						className="fa-brands fa-whatsapp fa-xl"
						style={{ color: '#3FD252' }}
					/>
					<span>wa.me/</span>
				</label>
				<input
					id="walink"
					name="walink"
					type="text"
					maxLength="15"
					placeholder="bijv.: 31612345678"
					value={waLink}
					onChange={setWaHandler}
					disabled={loadingData}
				/>
			</div>
		</form>
	)
}

export default Whatsapp
