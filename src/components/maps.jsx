import React, { useState, useEffect } from 'react'

import { useLocation } from '@reach/router'

import axios from 'axios'

import GoogleMapReact from 'google-map-react'

// import mapsLogo from '../../logo/Menefex-icon.svg'

import * as mapsStyles from '../styles/modules/maps.module.scss'

const defaultProps = {
	center: {
		lat: 52.30994007862562,
		lng: 4.974422834381031
	},
	zoom: 15
}

const Marker = ({ lat, lng, onClick }) => {
	return (
		<div
			data-lat={lat}
			data-lng={lng}
			className={mapsStyles.marker}
			onClick={onClick}
		>
			<img src={'mapsLogo'} alt={'title'} />
			<i className="fa-solid fa-bars fa-lg" />
		</div>
	)
}

const dummyPins = [
	{ lat: 52.31049600748774, lng: 4.973736770446289, name: 'Pin 1' },
	{ lat: 52.31149600748774, lng: 4.974736770446289, name: 'Pin 2' },
	{ lat: 52.31249600748774, lng: 4.975736770446289, name: 'Pin 3' },
	{ lat: 52.31349600748774, lng: 4.976736770446289, name: 'Pin 4' }
]

const Maps = () => {
	const [pins, setPins] = useState([])
	const [selectedPin, setSelectedPin] = useState(null)

	console.log(selectedPin)

	const apiURL = process.env.GATSBY_BACKEND_URL

	useEffect(() => {
		const getMapPins = async () => {
			try {
				const res = await axios.get(`${apiURL}/api/instanties?populate=*`)
				setPins(res.data.data)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
		getMapPins()
	}, [])

	const handleMarkerClick = pin => {
		setSelectedPin(pin)
	}

	return (
		<div className={mapsStyles.maps}>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: process.env.GATSBY_GOOGLE_MAPS_KEY,
					language: 'nl',
					region: 'NL'
				}}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			>
				{dummyPins.map((pin, index) => (
					<Marker
						key={index}
						lat={pin.lat}
						lng={pin.lng}
						onClick={() => handleMarkerClick(pin)}
					/>
				))}
			</GoogleMapReact>
			{selectedPin && (
				<div className={mapsStyles.infoWindow}>
					<p>Name: {selectedPin.name}</p>
					<p>Latitude: {selectedPin.lat}</p>
					<p>Longitude: {selectedPin.lng}</p>
					{/* Add more details you want to display */}
				</div>
			)}
		</div>
	)
}

export default Maps
