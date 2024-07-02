import React from 'react'

import { Link } from 'gatsby'

import { Highlight } from 'react-instantsearch'

const Hit = ({ hit }) => {
	const avatarUrl = hit && hit.avatar ? hit.avatar.url : null

	return (
		<Link to={`/${hit.slug}`}>
			<article>
				{avatarUrl ? (
					<img src={avatarUrl} alt="Avatar" />
				) : (
					<div>No Avatar</div>
				)}

				<div className="hit-content">
					<div className="hit-profile">
						<Highlight attribute="profile" hit={hit} />
					</div>
					<div className="hit-occupate">
						<Highlight attribute="occupate" hit={hit} />
					</div>
					<div className="hit-biography">
						<Highlight attribute="biography" hit={hit} />
					</div>
				</div>
			</article>
		</Link>
	)
}

export default Hit
