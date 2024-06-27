import React from 'react'

import { Highlight } from 'react-instantsearch'
import { getPropertyByPath } from 'instantsearch.js/es/lib/utils'

export const Hit = ({ hit }) => {
	return (
		<article>
			<img src={hit && hit.avatar.url} />
			<div className="hit-profiel">
				<Highlight attribute="profiel" hit={hit} />
			</div>
			<div className="hit-occupate">
				<Highlight attribute="occupate" hit={hit} />
			</div>
			<div className="hit-biografie">
				<Highlight attribute="biografie" hit={hit} />
			</div>
		</article>
	)
}
