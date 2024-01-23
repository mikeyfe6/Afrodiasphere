import React, { useState, useLayoutEffect, useCallback, useRef } from 'react'

import axios from 'axios'

import * as styles from '../../../styles/modules/dashboard/links.module.scss'

const Links = ({
	apiURL,
	token,
	setLoading,
	setError,
	links,
	setLinks,
	linkError,
	setLinkError
}) => {
	const linkTitle = useRef(null)
	const hyperLink = useRef(null)

	const [editLinkTitle, setEditLinkTitle] = useState('')
	const [editLinkUrl, setEditLinkUrl] = useState('')

	const createLink = async () => {
		if (
			(!linkTitle.current.value && !hyperLink.current.value) ||
			/^\s*$/.test(linkTitle.current.value && hyperLink.current.value)
		) {
			return [
				setLinkError('Posten mislukt, voer de titel of link correct door..'),
				setTimeout(() => setLinkError(null), 7500)
			]
		}

		const params = {
			title: linkTitle.current.value,
			hyperlink: hyperLink.current.value
		}
		const res = await axios.post(
			`${apiURL}/api/connections`,
			{ data: params },
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		const newLinks = [...links, res.data.data.attributes]
		setLinks(newLinks)

		getLinks()
		linkTitle.current.value = ''
		hyperLink.current.value = ''
	}

	const toggleLink = async (link, checked) => {
		const params = {
			visible: checked
		}
		const res = await axios.put(
			`${apiURL}/api/connections/${link.id}`,
			{ data: params },
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		const newLinks = links.map(el => {
			if (el.id === link.id) {
				return res.data.data.attributes
			}
			return el
		})
		setLinks(newLinks)
		getLinks()
	}

	const deleteLink = async link => {
		await axios.delete(`${apiURL}/api/connections/${link.id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		setLinks(links.filter(el => el.id !== link.id))
	}

	const handleEditLink = (event, linkId) => {
		setEditLinkTitle({
			...editLinkTitle,
			[linkId]: event.target.value
		})
	}

	const handleEditHyperLink = (event, linkId) => {
		setEditLinkUrl({
			...editLinkUrl,
			[linkId]: event.target.value
		})
	}

	const editTheLink = async link => {
		const changedLinkTitle = link.value.trim()

		if (!changedLinkTitle || /^\s*$/.test(changedLinkTitle)) {
			return [
				setLinkError('Updaten mislukt, voer de titel correct door..'),
				setTimeout(() => setLinkError(null), 7500)
			]
		}

		const params = {
			title: changedLinkTitle
		}
		const res = await axios.put(
			`${apiURL}/api/connections/${link.id}`,
			{ data: params },
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		const newLinks = links.map(el => {
			if (el.id === link.id) {
				return res.data.data.attributes
			}
			return el
		})
		setLinks(newLinks)
		setEditLinkTitle('')
		getLinks()
	}

	const editTheHyperLink = async link => {
		const changedLinkUrl = link.value.trim()

		if (!changedLinkUrl || /^\s*$/.test(changedLinkUrl)) {
			return [
				setLinkError('Updaten mislukt, voer de link correct door..'),
				setTimeout(() => setLinkError(null), 5000)
			]
		}

		const params = {
			hyperlink: changedLinkUrl
		}
		const res = await axios.put(
			`${apiURL}/api/connections/${link.id}`,
			{ data: params },
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		const newLinks = links.map(el => {
			if (el.id === link.id) {
				return res.data.data.attributes
			}
			return el
		})
		setLinks(newLinks)
		setEditLinkUrl('')
		getLinks()
	}

	const getLinks = useCallback(async () => {
		const res = await axios.get(`${apiURL}/api/connections`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		setLinks(res.data)
	}, [token])

	useLayoutEffect(() => {
		getLinks()
	}, [getLinks])

	return (
		<>
			<div className={styles.newLink}>
				<div className={styles.newLinkFields}>
					<div className={styles.newTitle}>
						<label htmlFor="newtitle">
							<h4 style={{ color: 'white' }}>
								Titel<span>:</span>
							</h4>
						</label>
						<input
							id="newtitle"
							type="text"
							placeholder="voer een titel in"
							ref={linkTitle}
							minLength="5"
							required
						/>
					</div>
					<hr />
					<div className={styles.newHyperlink}>
						<label htmlFor="newhyperlink">
							<h4 style={{ color: 'white' }}>
								Hyperlink<span>:</span>
							</h4>
						</label>
						<input
							id="newhyperlink"
							type="url"
							placeholder="voorbeeld.nl"
							ref={hyperLink}
							style={{ textTransform: 'lowercase' }}
							minLength="5"
							title="Let op: 'http(s)://' NIET nodig !"
							required
						/>
					</div>
				</div>

				<div className={styles.newLinkBtns}>
					<button
						onClick={event => {
							createLink()
							event.preventDefault()
						}}
					>
						Creëer link
					</button>
					<button
						onClick={event => {
							linkTitle.current.value = ''
							hyperLink.current.value = ''
							event.preventDefault()
						}}
					>
						Reset invoer
					</button>
				</div>

				{linkError && <DoThis text={linkError} />}
			</div>

			<ul className={styles.linkList}>
				{links.map((link, index) => (
					<li key={index} className={styles.link}>
						<div className={styles.linkFields}>
							<div className={styles.linkTitle}>
								<div>
									<span>
										<p title={link.title}>{link.title}</p>
									</span>
									<hr />
									<input
										id={`editlink${link.id}`}
										type="text"
										value={editLinkTitle[link.id] || ''}
										onChange={event => handleEditLink(event, link.id)}
										placeholder="bewerk titel"
										minLength="5"
										required
									/>
								</div>
								<button
									title="Sla nieuwe titel op"
									disabled={
										!editLinkTitle[link.id] ||
										editLinkTitle[link.id].trim() === ''
									}
									onClick={event => {
										editTheLink({
											id: link.id,
											value: editLinkTitle[link.id]
										})
										event.preventDefault()
									}}
								>
									{!editLinkTitle[link.id] ||
									editLinkTitle[link.id].trim() === '' ? (
										<i class="fa-solid fa-ellipsis"></i>
									) : (
										<i class="fa-solid fa-check"></i>
									)}
								</button>
							</div>
							<div className={styles.linkUrl}>
								<div>
									<span>
										<a
											href={`https://${link.hyperlink}`}
											title={`https://${link.hyperlink}`}
											rel="noopener noreferrer"
											target="_blank"
										>
											{link.hyperlink}
										</a>
									</span>
									<hr />
									<input
										id={`hyperlink${link.id}`}
										type="url"
										value={editLinkUrl[link.id] || ''}
										onChange={event => handleEditHyperLink(event, link.id)}
										placeholder="bewerk hyperlink"
										minLength="5"
										required
									/>
								</div>
								<button
									title="Sla nieuwe hyperlink op"
									disabled={
										!editLinkUrl[link.id] || editLinkUrl[link.id].trim() === ''
									}
									onClick={event => {
										editTheHyperLink({
											id: link.id,
											value: editLinkUrl[link.id]
										})
										event.preventDefault()
									}}
								>
									{!editLinkUrl[link.id] ||
									editLinkUrl[link.id].trim() === '' ? (
										<i class="fa-solid fa-ellipsis"></i>
									) : (
										<i class="fa-solid fa-check"></i>
									)}
								</button>
							</div>
						</div>

						<div className={styles.linkBtns}>
							<div
								className={styles.trashBtn}
								title="Verwijder deze link"
								onClick={event => {
									deleteLink(link)
									event.preventDefault()
								}}
							>
								<i className="fa-solid fa-trash-can fa-lg" />
							</div>
							<div className={styles.showBtn}>
								<input
									title="Maak link (ont)zichtbaar"
									type="checkbox"
									id={`checkbox${link.id}`}
									checked={link.visible}
									onChange={e => toggleLink(link, e.target.checked)}
									hidden
								/>

								<span onClick={() => toggleLink(link, !link.visible)}>
									{link.visible ? (
										<i className="fa-solid fa-eye-slash" />
									) : (
										<i className="fa-solid fa-eye" />
									)}
								</span>
							</div>
						</div>
					</li>
				))}
			</ul>
		</>
	)
}

export default Links
