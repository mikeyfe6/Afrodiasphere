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

const Search = ({ style }) => {
	const rootRef = useRef()
	const [hasFocus, setFocus] = useState(false)

	useClickOutside(rootRef, () => setFocus(false))

	return (
		<div
			ref={rootRef}
			onClick={() => setFocus(true)}
			role="search"
			style={style}
			className='search'
		>
			<InstantSearch
				searchClient={searchClient}
				indexName={ALGOLIA_INDEX_NAME}
				stalledSearchDelay={500}
			>
				<SearchBox placeholder="Zoek een ADS-profiel..." />
				{hasFocus && (
					<EmptyQueryBoundary fallback={null}>
						<Hits hitComponent={Hit} />
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

export default Search
