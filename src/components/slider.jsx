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
				loop
				spaceBetween={15}
				autoplay={{ delay: 5000 }}
				breakpoints={{
					320: {
						slidesPerView: 1
					},
					420: {
						slidesPerView: 2
					},
					576: {
						slidesPerView: 3
					},
					768: {
						slidesPerView: 4
					}
				}}
			>
				{carousel.map(ads => (
					<SwiperSlide
						key={ads.id}
						// className={`theme-${color}-links`}
						className={styles.carouselSlide}
					>
						<div>
							<img
								src={!ads.avatar?.url ? noavatar : ads.avatar?.url}
								className={styles.avatar}
								alt={ads.profiel}
							/>
							<div className={styles.profile}>{ads.profiel}</div>
							<div className={styles.occupate}>{ads.occupate || '..'}</div>
							<div className={styles.biography}>
								<p
									dangerouslySetInnerHTML={{
										__html: ads.biografie
									}}
								/>
							</div>
							<div className={styles.url}>
								<Link to={`/${ads.slug}`} title={`${baseURL}/${ads.slug}`}>
									✨../{`${ads.slug}`}
								</Link>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	)
}

export default Slider
