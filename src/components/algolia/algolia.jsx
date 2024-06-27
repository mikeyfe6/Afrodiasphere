import React, { useEffect } from 'react'

import algoliasearch from 'algoliasearch'
import axios from 'axios'

import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } from './keys'

const apiURL = process.env.GATSBY_BACKEND_URL

const Algolia = () => {
	useEffect(() => {
		const indexData = async () => {
			const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
			const index = client.initIndex(ALGOLIA_INDEX_NAME)

			try {
				const response = await axios.get(`${apiURL}/api/instanties?populate=*`)
				const records = response.data

				const objectsWithID = records.map(record => ({
					objectID: record.id,
					...record
				}))

				const { objectIDs } = await index.saveObjects(objectsWithID)
				console.log('Objects indexed successfully:', objectIDs)
			} catch (error) {
				console.error('Error during indexing:', error)
			}
		}

		indexData()
	}, [])

	return null
}

export default Algolia
