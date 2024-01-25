import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/profileInfo.module.scss'

const Profile = ({
	userId,
	apiURL,
	token,
	setLoading,
	setError,
	profile,
	setProfile,
	loadingData
}) => {
	const setProfileHandler = e => {
		setProfile(e.target.value || '')
	}

	const submitProfile = async e => {
		e.preventDefault()

		const params = {
			profiel: profile
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

			setError(null)
		} catch {
			setError("Updaten van profielnaam lukt niet, probeer het nog 's")
			setTimeout(() => setError(null), 5000)
		}
	}

	useEffect(() => {
		const getProfile = async () => {
			const res = await axios.get(`${apiURL}/api/instanties`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setProfile(res.data.profiel)
		}
		getProfile()
	}, [token])

	return (
		<form onSubmit={submitProfile} className={styles.profileField}>
			<label htmlFor="profile">Profielnaam</label>
			<input
				id="profile"
				type="text"
				maxLength="35"
				name="text"
				value={profile}
				onChange={setProfileHandler}
				disabled={loadingData}
			/>
			<button type="submit" title="Sla profielnaam op">
				Opslaan
			</button>
		</form>
	)
}

export default Profile
