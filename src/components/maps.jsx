import React, { useState, useEffect } from 'react'

import { useLocation } from '@reach/router'
import { Link } from 'gatsby'
import axios from 'axios'

import GoogleMapReact from 'google-map-react'

import * as mapsStyles from '../styles/modules/maps.module.scss'

import noavatar from '../images/noavatar.png'

const defaultProps = {
	center: {
		lat: 52.30994007862562,
		lng: 4.974422834381031
	},
	zoom: 10
}

const Marker = ({ lat, lng, imageUrl, onClick }) => (
	<div
		data-lat={lat}
		data-lng={lng}
		className={mapsStyles.marker}
		onClick={onClick}
	>
		<img src={!imageUrl ? noavatar : imageUrl} alt={'Marker'} />
	</div>
)

const Maps = () => {
	const [pins, setPins] = useState([])
	const [selectedPin, setSelectedPin] = useState(null)

	const apiURL = process.env.GATSBY_BACKEND_URL

	useEffect(() => {
		const getMapPins = async () => {
			try {
				const res = await axios.get(`${apiURL}/api/instanties?populate=*`)
				const data = res.data.map(item => ({
					...item.address,
					imageUrl: item.avatar?.url,
					profile: item.profile,
					slug: item.slug,
					biography: item.biography,
					occupate: item.occupate
				}))
				setPins(data)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
		getMapPins()
	}, [apiURL])

	const handleMarkerClick = pin => {
		setSelectedPin(pin)
	}

	return (
		<div className={mapsStyles.mapsContainer}>
			<div className={`${mapsStyles.maps} ${mapsStyles.adsHome}`}>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: process.env.GATSBY_GOOGLE_MAPS_KEY,
						language: 'nl',
						region: 'NL'
					}}
					defaultCenter={defaultProps.center}
					defaultZoom={defaultProps.zoom}
					center={defaultProps.center}
				>
					{pins.map((pin, index) => (
						<Marker
							key={index}
							lat={pin.latitude}
							lng={pin.longitude}
							imageUrl={pin.imageUrl}
							onClick={() => handleMarkerClick(pin)}
						/>
					))}
				</GoogleMapReact>
			</div>

			{selectedPin && (
				<div className={mapsStyles.mapsInfo}>
					<div className={mapsStyles.mapsInfoWrapper}>
						<div>
							{selectedPin.profile && (
								<h3>
									{selectedPin.profile}{' '}
									{selectedPin.occupate && <span>{selectedPin.occupate}</span>}
								</h3>
							)}

							<span>
								<i className="fa-solid fa-map-location-dot fa-lg" />
								{selectedPin.location}
							</span>

							{selectedPin.biography && <p>{selectedPin.biography}</p>}
							{selectedPin.slug && (
								<Link to={'/' + selectedPin.slug + '/'}>Naar ADS-page</Link>
							)}
						</div>
						<div>
							{selectedPin.imageUrl && (
								<img src={selectedPin.imageUrl} alt={selectedPin.profile} />
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Maps
