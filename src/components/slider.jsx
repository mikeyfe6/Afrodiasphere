import React, { useState, useEffect } from 'react'

import { Link } from 'gatsby'
import axios from 'axios'

import { useLocation } from '@reach/router'

import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay } from 'swiper/modules'

import * as styles from '../styles/modules/slider.module.scss'

import noavatar from '../images/noavatar.png'

const Slider = () => {
	const [carousel, setCarousel] = useState([])

	const location = useLocation()

	const apiURL = process.env.GATSBY_BACKEND_URL
	const baseURL = location.origin

	useEffect(() => {
		const getCarousel = async () => {
			try {
				const res = await axios.get(`${apiURL}/api/instanties?populate=*`)
				setCarousel(res.data)
			} catch (error) {
				console.error('Error fetching carousel data:', error)
			}
		}
		getCarousel()
	}, [])

	return (
		<section className={styles.carousel}>
			<Swiper
				modules={[A11y, Autoplay]}
				className={styles.carouselContainer}
				spaceBetween={50}
				slidesPerView={3}
				loop
				autoplay={{ delay: 5000 }}
				breakpoints={{
					320: {
						slidesPerView: 1
					},
					640: {
						slidesPerView: 2
					},
					768: {
						slidesPerView: 3
					}
				}}
			>
				{carousel.map(ads => (
					<SwiperSlide
						key={ads.id}
						// className={`theme-${color}-links`}
						className={styles.carouselSlide}
					>
						<img
							src={!ads.avatar?.url ? noavatar : ads.avatar?.url}
							className={styles.imgavatar}
							style={{
								transform: 'scale(0.7)',
								border: '5px solid white',
								minWidth: '150px',
								overflow: 'hidden'
							}}
							alt="avatar"
						/>
						<div className={styles.lead} style={{ color: 'white' }}>
							{ads.profiel}
						</div>
						<div
							style={{
								fontStyle: 'italic',
								fontSize: '0.75em',
								color: '#2eb4e9'
							}}
						>
							{ads.occupate || '..'}
						</div>
						<div
							className={styles.homeAdsBio}
							dangerouslySetInnerHTML={{
								__html: ads.biografie
							}}
						/>
						<div>
							{' '}
							<Link
								to={`/${ads.slug}`}
								style={{ color: '#cc9932' }}
								title={`${baseURL}/${ads.slug}`}
							>
								✨../{`${ads.slug}`}
							</Link>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	)
}

export default Slider
