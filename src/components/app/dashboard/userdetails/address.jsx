import React, { useState, useEffect } from 'react'

import axios from 'axios'

import GoogleMapReact from 'google-map-react'

import * as profileInfoStyles from '../../../../styles/modules/dashboard/profileInfo.module.scss'

import * as addressStyles from '../../../../styles/modules/dashboard/address.module.scss'

import * as mapsStyles from '../../../../styles/modules/maps.module.scss'

const defaultProps = {
	center: {
		lat: 52.30994007862562,
		lng: 4.974422834381031
	},
	zoom: 15
}

const Address = ({
	userId,
	apiURL,
	token,
	setSuccess,
	loadingData,
	setValidationMessage,
	preview,
	address,
	setAddress
}) => {
	const [pin, setPin] = useState(null)
	const [error, setError] = useState(null)
	const [validationError, setValidationError] = useState(null)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isLocationSearched, setIsLocationSearched] = useState(false)
	const [inputValue, setInputValue] = useState('')

	const apiKey = process.env.GATSBY_GOOGLE_GEO_KEY

	const Marker = ({ lat, lng }) => (
		<div data-lat={lat} data-lng={lng} className={mapsStyles.marker}>
			<img src={preview} alt={'title'} />
		</div>
	)

	useEffect(() => {
		setPin(address)
	}, [address])

	const fetchGeocode = async () => {
		try {
			const response = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
					inputValue
				)}&key=${apiKey}&language=nl`
			)

			if (response.data.status === 'OK') {
				const { formatted_address, geometry } = response.data.results[0]
				const newLocation = {
					location: formatted_address,
					latitude: geometry.location.lat,
					longitude: geometry.location.lng
				}

				setPin(newLocation)
				setAddress(newLocation)
				setIsLocationSearched(true)
				setError(null)
			} else {
				setError(`Unable to find location: ${response.data.status}`)
				setPin(null)
				setIsLocationSearched(false)
			}
		} catch (error) {
			setError(
				`An error occurred while fetching the location: ${error.message}`
			)
			setPin(null)
			setIsLocationSearched(false)
		}
	}

	const handleInputChange = e => {
		setInputValue(e.target.value)
		setIsLocationSearched(false)
	}

	const handleSearch = e => {
		e.preventDefault()
		fetchGeocode()
	}

	const validateInput = value => {
		if (value.length > 160) {
			const errorMessage = 'Maximaal 160 karakters'
			setValidationError(errorMessage)
			setValidationMessage(errorMessage)
			return false
		}

		setValidationError(null)
		setValidationMessage(null)
		return true
	}

	const submitAddress = async e => {
		e.preventDefault()

		if (!validateInput(address.location)) {
			return
		}

		setIsSubmitting(true)

		const params = {
			address: {
				location: address.location,
				latitude: address.latitude,
				longitude: address.longitude
			}
		}

		try {
			await axios.put(
				`${apiURL}/api/instanties/${userId}`,
				{ data: params },
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)

			setSuccess('Adres succesvol geüpdatet')
			setTimeout(() => setSuccess(null), 5000)
			setInputValue('')
		} catch (error) {
			console.error('Error updating address:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<>
			<form
				onSubmit={handleSearch}
				className={`${profileInfoStyles.profileField} ${profileInfoStyles.address}`}
			>
				<div>
					<label htmlFor="address">Adres</label>
					<input
						type="text"
						onChange={handleInputChange}
						placeholder="Bijv. Kelbergen 300, 1104LJ"
						id="address"
						name="address"
						value={inputValue}
						disabled={loadingData || isSubmitting}
						style={{ color: validationError ? '#CA231E' : 'inherit' }}
					/>
				</div>
				<div>
					<button type="submit" disabled={!inputValue}>
						Zoeken
					</button>
					<button
						type="button"
						onClick={submitAddress}
						disabled={!isLocationSearched || !inputValue}
					>
						Opslaan
					</button>
					<button type="reset">Reset</button>
				</div>
			</form>

			<div className={addressStyles.address}>
				<h3>Locatie Details:</h3>
				<input
					value={
						pin && pin.location ? pin.location : address ? address.location : ''
					}
					readOnly
				/>
			</div>

			{error && <p>{error}</p>}

			<div className={`${mapsStyles.maps} ${mapsStyles.adsDashboard}`}>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: process.env.GATSBY_GOOGLE_MAPS_KEY,
						language: 'nl',
						region: 'NL'
					}}
					defaultCenter={defaultProps.center}
					defaultZoom={defaultProps.zoom}
					center={
						pin && pin.latitude && pin.longitude
							? { lat: pin.latitude, lng: pin.longitude }
							: defaultProps.center
					}
				>
					{pin && pin.latitude && pin.longitude && (
						<Marker lat={pin.latitude} lng={pin.longitude} />
					)}
				</GoogleMapReact>
			</div>
		</>
	)
}

export default Address
