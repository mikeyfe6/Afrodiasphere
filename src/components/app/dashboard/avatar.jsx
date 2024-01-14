import React, { useState, useRef, useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../styles/modules/dashboard/avatar.module.scss'

const Avatar = ({
	userId,
	apiURL,
	token,
	setLoading,
	setPreview,
	preview,
	noavatar
}) => {
	const [avatarId, setAvatarID] = useState(null)
	const [image, setImage] = useState(null)

	const fileInputRef = useRef()

	useEffect(() => {
		const getAvatarId = async () => {
			try {
				const res = await axios.get(`${apiURL}/api/instanties`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})

				if (!res.data.avatar) {
					setPreview(noavatar)
				} else {
					setAvatarID(res.data.avatar.id)
				}
			} catch (error) {
				console.error('Error getting avatar ID:', error)
			}
		}

		getAvatarId()
	}, [token])

	const deleteAvatar = async e => {
		e.preventDefault()
		setImage(null)
		setPreview(noavatar)

		try {
			setLoading(true)
			await axios.delete(`${apiURL}/api/upload/files/${avatarId}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			setTimeout(() => setLoading(false), 5000)
		} catch (error) {
			console.error("Avatar verwijderen lukt niet, probeer het nog 's", error)
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			setLoading(true)
			const imgData = new FormData()
			imgData.append('files', image)
			imgData.append('ref', 'api::instantie.instantie')
			imgData.append('refId', userId)
			imgData.append('field', 'avatar')

			await axios.post(`${apiURL}/api/upload/`, imgData, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			setTimeout(() => setLoading(false), 5000)
		} catch (error) {
			console.log('Niet gelukt!', error)
		}
	}

	useEffect(() => {
		if (image) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setPreview(reader.result)
			}
			reader.readAsDataURL(image)
		}
	}, [image])

	useEffect(() => {
		const getAvatar = async () => {
			try {
				const res = await axios.get(`${apiURL}/api/instanties`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})

				if (!res.data.avatar) {
					setPreview(noavatar)
				} else {
					setPreview(res.data.avatar.url)
				}
			} catch (error) {
				console.error('Error getting avatar image:', error)
			}
		}

		getAvatar()
	}, [apiURL, token])

	return (
		<form onSubmit={handleSubmit} className={styles.avatar}>
			<div>
				<img
					src={preview}
					alt=""
					className={styles.avatarImage}
					style={{ border: '3px solid white' }}
				/>{' '}
			</div>

			<div className={styles.avatarButtons}>
				<button
					className={`${styles.btn} ${styles.addBtn}`}
					onClick={event => {
						event.preventDefault()
						fileInputRef.current.click()
					}}
					title="Kies een avatar"
				>
					{' '}
					Avatar
				</button>
				<button
					className={`${styles.btn} ${styles.btnLight} ${styles.resetBtn}`}
					type="reset"
					onClick={deleteAvatar}
					title="Verwijder jouw avatar"
				>
					Verwijder
				</button>
				<input
					type="file"
					accept="image/*"
					style={{ display: 'none' }}
					ref={fileInputRef}
					onChange={event => {
						const file = event.target.files[0]

						if (file && file.type.substring(0, 5) === 'image') {
							setImage(file)
						} else {
							setImage(null)
						}
					}}
				/>
				<button
					className={`${styles.btn} ${styles.btnSecondary} ${styles.submitBtn}`}
					type="submit"
					title="Sla jouw avatar op"
				>
					Opslaan
				</button>
			</div>
		</form>
	)
}

export default Avatar
