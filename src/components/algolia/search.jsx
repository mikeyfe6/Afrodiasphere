import React from 'react'

import algoliasearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/satellite.css'
import { Hits, InstantSearch, SearchBox, Configure } from 'react-instantsearch'

import { Hit } from './hit'
import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY, ALGOLIA_INDEX_NAME } from './keys'

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY)

import '../../styles/algolia.css'

export const Search = () => {
	return (
		<InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
			<Configure hitsPerPage={5} />
			<div className="ais-InstantSearch">
				<SearchBox />
				<Hits hitComponent={Hit} />
			</div>
		</InstantSearch>
	)
}
