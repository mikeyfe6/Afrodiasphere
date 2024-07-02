import React from 'react'

import * as styles from '../../../../styles/modules/dashboard/socials.module.scss'

const Instagram = ({ igLink, setIgLink, handleSmLinkChange, loadingData }) => {
	const setIgHandler = e => {
		const newIgLink = e.target.value.toLowerCase()
		setIgLink(newIgLink)

		handleSmLinkChange('instagram', newIgLink)
	}

	return (
		<form className={styles.socialField}>
			<div>
				<label htmlFor="iglink">
					<i
						className="fa-brands fa-instagram fa-xl"
						style={{ color: '#F81F58' }}
					/>
					instagram.com/
				</label>

				<input
					id="iglink"
					name="iglink"
					type="text"
					placeholder="jouwprofiel"
					value={igLink}
					onChange={setIgHandler}
					disabled={loadingData}
				/>
			</div>
		</form>
	)
}

export default Instagram
