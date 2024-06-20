import React from 'react'

import axios from 'axios'

import * as styles from '../../../../styles/modules/dashboard/profileInfo.module.scss'

// TODO: add a doublecheck for the right password

const Terminate = ({
	gatsbyId,
	setGatsbyId,
	userId,
	setUserId,
	apiURL,
	token,
	setLoading,
	setError,
	deleteAds,
	setDeleteAds
}) => {
	const setDeleteHandler = e => {
		setDeleteAds(e.target.value.toLowerCase().replace(/\s+/g, ''))
	}

	// console.log(userId)
	// console.log(gatsbyId)

	const submitDeleteAds = async e => {
		e.preventDefault()

		try {
			const jwtTokens = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}

			const deleteLinks = async links => {
				await Promise.all(
					links.map(async link => {
						try {
							await axios.delete(
								`${apiURL}/api/connections/${link.id}`,
								jwtTokens
							)
							setLinks(prevLinks => prevLinks.filter(el => el.id !== link.id))
						} catch (error) {
							console.error(`Error deleting link with ID ${link.id}:`, error)
							throw error
						}
					})
				)
			}

			// Delete all links asynchronously
			await deleteLinks(links)

			const deleteInstantie = async () => {
				try {
					return await axios.delete(
						`${apiURL}/api/instanties/${userId}`,
						jwtTokens
					)
				} catch (error) {
					console.error('Error deleting instantie:', error)
					throw error
				}
			}

			const deleteUser = async () => {
				try {
					return await axios.delete(
						`${apiURL}/api/users/${gatsbyId}`,
						jwtTokens
					)
				} catch (error) {
					console.error('Error deleting user:', error)
					throw error
				}
			}

			if (deleteAds === username) {
				// Reorder deletion operations
				const [delLinks, delUser, delInstantie] = await Promise.all([
					deleteLinks(links),
					deleteUser(),
					deleteInstantie()
				])

				// Access the IDs from the response
				setGatsbyId(delUser.data.data.id)
				setUserId(delInstantie.data.id)

				logout(() => navigate('/login/'))
			} else {
				setError(
					"Er gaat iets mis met het verwijderen van jouw account, probeer het nog 's"
				)
				setTimeout(() => setError(null), 5000)
			}

			setError(null)
		} catch (error) {
			setError('Verwijderen van je account mislukt')
			console.error('Error in submitDeleteAds:', error)
			setTimeout(() => setError(null), 5000)
		}
	}

	return (
		<form onSubmit={submitDeleteAds} className={styles.profileField}>
			<label htmlFor="deleteAds">Verwijder profiel</label>
			<input
				onChange={setDeleteHandler}
				value={deleteAds}
				type="text"
				name="deleteAds"
				id="deleteAds"
				placeholder="controle: profielnaam?"
				maxLength="25"
			/>

			<button
				type="submit"
				className={styles.terminateBtn}
				disabled={setLoading || deleteAds === ''}
			>
				Wis Profiel
			</button>
		</form>
	)
}

export default Terminate
