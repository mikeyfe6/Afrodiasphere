import React from 'react'

import Layout from '../components/layout'
import Seo from '../components/seo'

import Intro from '../components/intro'
import Slider from '../components/slider'

import 'swiper/scss'
import 'swiper/scss/effect-fade'
import 'swiper/scss/autoplay'

const IndexPage = () => {
	return (
		<Layout>
			<Intro />
			<Slider />
		</Layout>
	)
}

export default IndexPage

export const Head = () => {
	return <Seo title="Home" />
}
