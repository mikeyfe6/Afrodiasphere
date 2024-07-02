import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../styles/modules/dashboard/occupation.module.scss'

const Occupation = ({
	userId,
	apiURL,
	token,
	setLoading,
	setError,
	occupate,
	setOccupate
}) => {
	const onOccupateChange = async e => {
		setOccupate(e.target.value)

		const params = {
			occupate: e.target.value
		}
		await axios.put(
			`${apiURL}/api/instanties/${userId}`,
			{ data: params },
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)
	}

	useEffect(() => {
		if (occupate === 'bedrijf') {
			document
				.getElementById('currentBedrijf')
				.classList.add(styles.currentOccupate)
		} else {
			document
				.getElementById('currentBedrijf')
				.classList.remove(styles.currentOccupate)
		}
		if (occupate === 'zelfstandig') {
			document
				.getElementById('currentZelfstandig')
				.classList.add(styles.currentOccupate)
		} else {
			document
				.getElementById('currentZelfstandig')
				.classList.remove(styles.currentOccupate)
		}
		if (occupate === 'hobbyist') {
			document
				.getElementById('currentHobbyist')
				.classList.add(styles.currentOccupate)
		} else {
			document
				.getElementById('currentHobbyist')
				.classList.remove(styles.currentOccupate)
		}
		if (occupate === 'stichting') {
			document
				.getElementById('currentStichting')
				.classList.add(styles.currentOccupate)
		} else {
			document
				.getElementById('currentStichting')
				.classList.remove(styles.currentOccupate)
		}
		if (occupate === 'artist') {
			document
				.getElementById('currentArtist')
				.classList.add(styles.currentOccupate)
		} else {
			document
				.getElementById('currentArtist')
				.classList.remove(styles.currentOccupate)
		}
	}, [occupate])

	return (
		<form className={styles.occupation}>
			<fieldset>
				<legend>Occupatie:</legend>
				<input
					id="bedrijf"
					type="radio"
					value="bedrijf"
					checked={occupate === 'bedrijf'}
					onChange={onOccupateChange}
				/>
				<label htmlFor="bedrijf" id="currentBedrijf" title="Ik ben een bedrijf">
					Bedrijf
				</label>

				<input
					id="zelfstandig"
					type="radio"
					value="zelfstandig"
					checked={occupate === 'zelfstandig'}
					onChange={onOccupateChange}
				/>
				<label
					htmlFor="zelfstandig"
					id="currentZelfstandig"
					title="Ik ben zzp-er / eenmanszaak"
				>
					Zelfstandig
				</label>

				<input
					id="hobbyist"
					type="radio"
					value="hobbyist"
					checked={occupate === 'hobbyist'}
					onChange={onOccupateChange}
				/>
				<label
					htmlFor="hobbyist"
					id="currentHobbyist"
					title="Ik ben een hobbyist"
				>
					Hobbyist
				</label>

				<input
					id="stichting"
					type="radio"
					value="stichting"
					checked={occupate === 'stichting'}
					onChange={onOccupateChange}
				/>
				<label
					htmlFor="stichting"
					id="currentStichting"
					title="Ik ben een stichting"
				>
					Stichting
				</label>

				<input
					id="artist"
					type="radio"
					value="artist"
					checked={occupate === 'artist'}
					onChange={onOccupateChange}
				/>
				<label htmlFor="artist" id="currentArtist" title="Ik ben een artiest">
					Artist
				</label>
			</fieldset>
		</form>
	)
}

export default Occupation
