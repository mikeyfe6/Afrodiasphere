import React, { useState } from 'react'
import axios from 'axios'

const Address = () => {
	const [address, setAddress] = useState('')
	const [location, setLocation] = useState(null)
	const [error, setError] = useState(null)

	const apiKey = process.env.GATSBY_GOOGLE_GEO_KEY

	const fetchGeocode = async () => {
		try {
			const response = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
			)
			console.log('API Response:', response.data)
			if (response.data.status === 'OK') {
				const { formatted_address, geometry } = response.data.results[0]
				setLocation({
					formattedAddress: formatted_address,
					latitude: geometry.location.lat,
					longitude: geometry.location.lng
				})
				console.log('Location:', location)
				setError(null)
			} else {
				setError(`Unable to find location: ${response.data.status}`)
				setLocation(null)
			}
		} catch (error) {
			setError(
				`An error occurred while fetching the location: ${error.message}`
			)
			setLocation(null)
		}
	}

	const handleInputChange = e => {
		setAddress(e.target.value)
		console.log(e.target.value)
	}

	const handleSearch = e => {
		e.preventDefault()
		fetchGeocode()
	}

	return (
		<div>
			<h1>Geocode Address</h1>
			<form onSubmit={handleSearch}>
				<input
					type="text"
					value={address}
					onChange={handleInputChange}
					placeholder="Enter address"
				/>
				<button type="submit">Search</button>
			</form>
			{location && (
				<div>
					<h2>Location Details</h2>
					<p>Address: {location.formattedAddress}</p>
					<p>Latitude: {location.latitude}</p>
					<p>Longitude: {location.longitude}</p>
				</div>
			)}
			{error && <p>{error}</p>}
		</div>
	)
}

export default Address
