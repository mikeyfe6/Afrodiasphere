import React from 'react'

import * as styles from '../../../../styles/modules/dashboard/socials.module.scss'

const Facebook = ({ fbLink, setFbLink, handleSmLinkChange, loadingData }) => {
	const setFbHandler = e => {
		const newFbLink = e.target.value.toLowerCase()
		setFbLink(newFbLink)

		handleSmLinkChange('facebook', newFbLink)
	}

	return (
		<form className={styles.socialField}>
			<div>
				<label htmlFor="fblink">
					<i className="fa-brands fa-facebook-f" style={{ color: '#4867AA' }} />
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
