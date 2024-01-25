import React from 'react'

import { Link } from 'gatsby'

import Spinner from '../../spinner'

import * as styles from '../../../styles/modules/dashboard/adslink.module.scss'

const AdsLink = ({ slug, baseURL, loadingData }) => {
	return (
		<div className={styles.adsLink}>
			{loadingData ? (
				<Spinner />
			) : (
				<>
					<div className={styles.adsPrefix}>
						<b>Afrodiasphere URL</b>
					</div>

					<div className={styles.adsSlug}>
						{slug ? (
							<Link
								to={`/${slug}/`}
								title={`${baseURL}/${slug}/`}
							>{`✨../${slug}`}</Link>
						) : (
							<p>Link wordt gemaakt...</p>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default AdsLink
