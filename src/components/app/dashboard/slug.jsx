import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../styles/modules/dashboard/profileInfo.module.scss'

// TODO: bedenken wat ik met die slug ga doen voor end-users

const Slug = ({
	userId,
	apiURL,
	token,
	setLoading,
	setError,
	slug,
	setSlug
}) => {
	const setSlugHandler = e => {
		setSlug(e.target.value.toLowerCase())
	}

	const submitSlug = async e => {
		e.preventDefault()

		const params = {
			slug: slug
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

			if (process.env.NODE_ENV === 'production') {
				await axios.post(
					`https://api.netlify.com/build_hooks/61fd35548a7a1a15735fd2b8`
				)
			}
		} catch {
			setError('Er gaat iets mis met het updaten van je slug')
			setTimeout(() => setError(null), 5000)
		}
	}

	useEffect(() => {
		const getSlug = async () => {
			const res = await axios.get(`${apiURL}/api/instanties`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			setSlug(res.data.slug)
		}
		getSlug()
	}, [token])

	return (
		<form onSubmit={submitSlug} className={styles.profileField} data-hidden>
			<label htmlFor="slug">Slug</label>
			<input
				onChange={setSlugHandler}
				value={slug}
				type="text"
				name="slug"
				id="slug"
				readOnly
				disabled
				// placeholder="*verplicht, bijv: 'jouw-profiel'"
				placeholder="*verplicht, de beheerder maakt deze voor u aan"
				maxLength="15"
				pattern="[^\s]+"
				title="geen spaties, alleen '-'"
			/>

			<button
				type="submit"
				disabled
				style={{
					paddingTop: '5px',
					paddingBottom: '5px',
					background: 'red',
					opacity: '0.3'
				}}
			>
				Update
			</button>
		</form>
	)
}

export default Slug
