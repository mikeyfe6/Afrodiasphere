import React, { useEffect, useRef, useState } from 'react'

import algoliasearch from 'algoliasearch/lite'

import {
	InstantSearch,
	SearchBox,
	Hits,
	useInstantSearch
} from 'react-instantsearch'

import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY, ALGOLIA_INDEX_NAME } from './keys'

import Hit from './hit'

import '../../styles/algolia.scss'

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY)

const useClickOutside = (ref, onClickOutside) => {
	const events = ['mousedown', 'touchstart']

	useEffect(() => {
		const isOutside = element => !ref.current || !ref.current.contains(element)
		const onClick = event => {
			if (isOutside(event.target)) {
				onClickOutside()
			}
		}

		for (const event of events) {
			document.addEventListener(event, onClick)
		}

		return () => {
			for (const event of events) {
				document.removeEventListener(event, onClick)
			}
		}
	}, [ref, onClickOutside])
}

const Search = ({ style, hasFocus, setFocus }) => {
	const rootRef = useRef()

	useClickOutside(rootRef, () => setFocus(false))

	return (
		<div
			ref={rootRef}
			onClick={() => setFocus(true)}
			role="search"
			style={style}
			className="algolia"
		>
			<InstantSearch
				searchClient={searchClient}
				indexName={ALGOLIA_INDEX_NAME}
				stalledSearchDelay={500}
			>
				<SearchBox placeholder="Zoek een ADS-profiel..." />
				{hasFocus && (
					<EmptyQueryBoundary fallback={null}>
						<NoResultsBoundary fallback={<NoResults />}>
							<Hits hitComponent={Hit} />
						</NoResultsBoundary>
					</EmptyQueryBoundary>
				)}
			</InstantSearch>
		</div>
	)
}

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

const NoResultsBoundary = ({ children, fallback }) => {
	const { results } = useInstantSearch()

	if (!results.__isArtificial && results.nbHits === 0) {
		return (
			<>
				{fallback}
				<div hidden>{children}</div>
			</>
		)
	}

	return children
}

const NoResults = () => {
	const { indexUiState } = useInstantSearch()

	return (
		<div className="no-results">
			<p>
				Geen zoekresultaten voor <q>{indexUiState.query}</q>.
			</p>
		</div>
	)
}

export default Search
