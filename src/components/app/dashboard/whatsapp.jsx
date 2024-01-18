import React, { useEffect } from 'react'

import axios from 'axios'

// import * as styles from '../../../styles/modules/avatarStyles.module.scss'

const Whatsapp = ({
	userId,
	apiURL,
	token,
	setLoading,
	setError,
	waLink,
	setWaLink
}) => {
	const setWaHandler = e => {
		setWaLink(e.target.value.toLowerCase())
	}

	useEffect(() => {
		let wahideme = document.getElementById('wahide')
		!waLink
			? (wahideme.style.display = 'none')
			: (wahideme.style.display = 'block')
	}, [waLink])

	const submitWA = async e => {
		e.preventDefault()

		const params = {
			whatsapplink: waLink
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
			setError('Gaat iets mis met het updaten van je whatsapplink')
			setTimeout(() => setError(null), 5000)
		}
	}

	useEffect(() => {
		const getWaLink = async () => {
			const res = await axios.get(`${apiURL}/api/instanties`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setWaLink(res.data.whatsapplink || '')
		}
		getWaLink()
	}, [token])

	return (
		<form onSubmit={submitWA}>
			<label htmlFor="walink">
				{/* <FaWhatsapp
                  size="1.1em"
                  className={socialIcons}
                  color="#3FD252"
                /> */}
				Whatsapp
			</label>
			<input
				onChange={setWaHandler}
				value={waLink}
				type="text"
				name="walink"
				id="walink"
				maxLength="15"
				placeholder="bijv.: 31612345678"
				// className={socialInput}
			/>
			<button
				type="submit"
				title="Sla Whatsapp-profiel op"
				style={{
					paddingTop: '5px',
					paddingBottom: '5px'
				}}
			>
				Opslaan
			</button>
		</form>
	)
}

export default Whatsapp
