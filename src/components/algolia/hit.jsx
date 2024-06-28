import React from 'react'

import { Highlight } from 'react-instantsearch'

const Hit = ({ hit }) => {
	const avatarUrl = hit && hit.avatar ? hit.avatar.url : null

	return (
		<article>
			{avatarUrl ? <img src={avatarUrl} alt="Avatar" /> : <div>No Avatar</div>}

			<div className="hit-content">
				<div className="hit-profiel">
					<Highlight attribute="profiel" hit={hit} />
				</div>
				<div className="hit-occupate">
					<Highlight attribute="occupate" hit={hit} />
				</div>
				<div className="hit-biografie">
					<Highlight attribute="biografie" hit={hit} />
				</div>
			</div>
		</article>
	)
}

export default Hit
