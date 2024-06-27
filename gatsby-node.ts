import { GatsbyNode } from 'gatsby'

import path from 'path'

import axios from 'axios'

const apiURL = process.env.GATSBY_BACKEND_URL

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
	actions
}) => {
	actions.setWebpackConfig({
		resolve: {
			alias: {
				'@components': path.resolve(__dirname, 'src/components'),
				'@styles': path.resolve(__dirname, 'src/styles'),
				'@images': path.resolve(__dirname, 'src/images'),
				'@hooks': path.resolve(__dirname, 'src/hooks'),
				'@utils': path.resolve(__dirname, 'src/utils'),
				'@templates': path.resolve(__dirname, 'src/templates')
			}
		}
	})
}

export const createPages: GatsbyNode['createPages'] = async ({ actions }) => {
	const { createPage } = actions

	try {
		const { data: getPageInstanties } = await axios.get(
			`${apiURL}/api/instanties?populate=*`
		)

		// Use Promise.all for parallelizing asynchronous operations
		await Promise.all(
			getPageInstanties.map(async ({ slug, persoon, id, profiel}) => {
				createPage({
					path: `/${slug}`,
					component: path.resolve('./src/templates/page.jsx'),
					context: {
						slug,
						persoon,
						id,
						profiel
					}
				})
			})
		)
	} catch (error) {
		// Handle errors gracefully, log the error, and maybe even throw it
		console.error('Error fetching data for creating pages:', error)
		throw error
	}
}
