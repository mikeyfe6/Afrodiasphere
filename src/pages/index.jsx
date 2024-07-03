import React from 'react'

import Layout from '../components/layout'
import Seo from '../components/seo'

import Intro from '../components/intro'
import Slider from '../components/slider'
import Maps from '../components/maps'

import 'swiper/scss'
import 'swiper/scss/effect-fade'
import 'swiper/scss/autoplay'

const IndexPage = () => {
	return (
		<Layout>
			<Intro />
			<Slider />
			<Maps />
		</Layout>
	)
}

export default IndexPage

export const Head = () => {
	return <Seo title="Home" />
}
