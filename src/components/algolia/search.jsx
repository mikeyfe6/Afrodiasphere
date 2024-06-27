// src/components/Search.js

import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import {
	InstantSearch,
	SearchBox,
	Hits,
	useInstantSearch
} from 'react-instantsearch'

import 'instantsearch.css/themes/satellite.css'
import { Hit } from './hit'
import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY, ALGOLIA_INDEX_NAME } from './keys'
import '../../styles/algolia.css'

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY)

const Search = () => (
	<InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
		<SearchBox />
		<EmptyQueryBoundary fallback={null}>
			<Hits hitComponent={Hit} />
		</EmptyQueryBoundary>
	</InstantSearch>
)

const EmptyQueryBoundary = ({ children, fallback }) => {
	const { indexUiState } = useInstantSearch()

	if (!indexUiState.query) {
		return (
			<>
				{fallback}
				<div hidden>{children}</div>
			</>
		)
	}

	return children
}

export default Search
