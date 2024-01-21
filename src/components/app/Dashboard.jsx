import React, { useState, useEffect, useCallback } from 'react'

import axios from 'axios'

import Seo from '../seo'

import { navigate, useLocation } from '@reach/router'
import { getUser, logout, isLoggedIn } from '../../services/auth'

import noavatar from '../../images/noavatar.png'

import Sidebar from './dashboard/sidebar'
import Avatar from './dashboard/avatar'
import Profile from './dashboard/userdetails/profile'
import Username from './dashboard/userdetails/username'
import Email from './dashboard/userdetails/email'
import Slug from './dashboard/userdetails/slug'
import Password from './dashboard/userdetails/password'
import Terminate from './dashboard/userdetails/terminate'
import Occupation from './dashboard/occupation'
import Biography from './dashboard/userdetails/biography'
import Facebook from './dashboard/socials/facebook'
import Twitter from './dashboard/socials/twitter'
import Instagram from './dashboard/socials/instagram'
import Whatsapp from './dashboard/socials/whatsapp'
import TikTok from './dashboard/socials/tiktok'
import Links from './dashboard/links'
import Themes from './dashboard/themes'
import Preview from './dashboard/preview'
import AdsLink from './dashboard/adslink'

import * as styles from '../../styles/modules/dashboard.module.scss'

const ErrorMessage = ({ text }) => {
	return (
		<div className={styles.logerror}>
			<span>{text}</span>
		</div>
	)
}

const DashboardPage = () => {
	useEffect(() => {
		if (!isLoggedIn()) {
			navigate('/login')
		}
	}, [])

	const location = useLocation()

	const apiURL = process.env.GATSBY_BACKEND_URL
	const baseURL = location.origin

	const AdsUser = getUser()
	const token = AdsUser.jwt

	const [userId, setUserId] = useState(null)
	const [gatsbyId, setGatsbyId] = useState(null)

	const [preview, setPreview] = useState(noavatar)

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const [linkError, setLinkError] = useState(null)

	const [profile, setProfile] = useState('')
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [slug, setSlug] = useState('')
	const [deleteAds, setDeleteAds] = useState('')

	const [occupate, setOccupate] = useState('')
	const [biography, setBiography] = useState('')

	const [fbLink, setFbLink] = useState('')
	const [twLink, setTwLink] = useState('')
	const [igLink, setIgLink] = useState('')
	const [waLink, setWaLink] = useState('')
	const [tkLink, setTkLink] = useState('')

	const [smLinks, setSmLinks] = useState({
		facebook: '',
		twitter: '',
		instagram: '',
		whatsapp: '',
		tiktok: ''
	})

	const [changedSmLinks, setSmChangedLinks] = useState({})

	const [links, setLinks] = useState([])

	const [color, setColor] = useState('')

	axios.interceptors.response.use(
		response => {
			return response
		},
		error => {
			if (error.response.status === 401) {
				logout(() => navigate('/login'))
				console.log('unauthorized, logging out ...')
			}
			return error
		}
	)

	const getUserId = useCallback(async () => {
		try {
			const res = await axios.get(`${apiURL}/api/instanties`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			setUserId(res.data.id)
		} catch (error) {
			console.error('Error fetching user ID:', error)
			setError('Er gaat iets mis met het ophalen van je gegevens')
		}
	}, [token])

	useEffect(() => {
		if (AdsUser.user.id) {
			setGatsbyId(AdsUser.user.id)
		} else {
			logout(() => navigate('/login'))
		}
	}, [AdsUser.user.id])

	useEffect(() => {
		getUserId()
	}, [getUserId])

	const handleSmLinkChange = (name, value) => {
		setSmLinks(prevLinks => ({
			...prevLinks,
			[name]: value
		}))

		setSmChangedLinks(prevChangedLinks => ({
			...prevChangedLinks,
			[name]: true
		}))
	}

	const handleSaveSocials = async () => {
		for (const [name, hasChanged] of Object.entries(changedSmLinks)) {
			if (hasChanged) {
				const params = {
					[`${name}link`]: smLinks[name]
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
					setError(`Something went wrong updating your ${name} link`)
					setTimeout(() => setError(null), 5000)
				}

				setSmChangedLinks(prevChangedLinks => ({
					...prevChangedLinks,
					[name]: false
				}))
			}
		}
	}

	return (
		<div className={`${styles.gridContainer}`}>
			{/* SIDEBAR SIDEBAR SIDEBAR SIDEBAR SIDEBAR <--------------------------------------------------------------------------------> SIDEBAR SIDEBAR SIDEBAR SIDEBAR SIDEBAR */}

			<aside id="ads-sidebar" className={styles.sidebar}>
				<Sidebar username={username} />
			</aside>

			{/* PREVIEW PREVIEW PREVIEW PREVIEW PREVIEW <--------------------------------------------------------------------------------> PREVIEW PREVIEW PREVIEW PREVIEW PREVIEW */}

			<section id="ads-preview" className={styles.preview}>
				<Preview
					preview={preview}
					profile={profile}
					occupate={occupate}
					biography={biography}
					links={links}
					fbLink={fbLink}
					twLink={twLink}
					igLink={igLink}
					waLink={waLink}
					tkLink={tkLink}
				/>
			</section>

			{/* DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD <-------------------------------------------------------> DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD */}

			<section id="ads-dashboard" className={styles.dashboard}>
				<h2>Profiel Info</h2>

				<div className={styles.avatarWProfileInfo}>
					<Avatar
						userId={userId}
						apiURL={apiURL}
						token={token}
						setLoading={setLoading}
						noavatar={noavatar}
						preview={preview}
						setPreview={setPreview}
					/>
					{/* PROFILE INFO ROFILE INFO PROFILE INFO PROFILE INFO <-----------------------------------------------------------> PROFILE INFO PROFILE INFO PROFILE INFO PROFILE INFO */}

					<div className={styles.profileInfo}>
						<Profile
							userId={userId}
							apiURL={apiURL}
							token={token}
							setError={setError}
							profile={profile}
							setProfile={setProfile}
						/>

						<Username
							gatsbyId={gatsbyId}
							apiURL={apiURL}
							token={token}
							setError={setError}
							username={username}
							setUsername={setUsername}
						/>

						<Email
							gatsbyId={gatsbyId}
							apiURL={apiURL}
							token={token}
							setError={setError}
							email={email}
							setEmail={setEmail}
						/>

						<Slug
							gatsbyId={gatsbyId}
							apiURL={apiURL}
							token={token}
							setError={setError}
							slug={slug}
							setSlug={setSlug}
						/>

						<Password
							gatsbyId={gatsbyId}
							apiURL={apiURL}
							token={token}
							setError={setError}
							password={password}
							setPassword={setPassword}
						/>

						<Terminate
							gatsbyId={gatsbyId}
							apiURL={apiURL}
							token={token}
							setError={setError}
							deleteAds={deleteAds}
							setDeleteAds={setDeleteAds}
						/>
					</div>
				</div>

				{loading && (
					<div className={styles.loadingComplete}>Profielfoto Geupload</div>
				)}
				{error && <ErrorMessage text={error} />}

				<div className={styles.occupationWBio}>
					<Occupation
						userId={userId}
						apiURL={apiURL}
						token={token}
						setError={setError}
						occupate={occupate}
						setOccupate={setOccupate}
					/>

					<Biography
						userId={userId}
						apiURL={apiURL}
						token={token}
						setError={setError}
						biography={biography}
						setBiography={setBiography}
					/>
				</div>

				<hr />

				{/* SOCIAL CONT SOCIAL CONT SOCIAL CONT SOCIAL CONT <-------------------------------------------------------> SOCIAL CONT SOCIAL CONT SOCIAL CONT SOCIAL CONT SOCIAL CONT */}

				<h2>Social Links</h2>

				<div className={styles.socials}>
					<Facebook
						userId={userId}
						apiURL={apiURL}
						token={token}
						setError={setError}
						fbLink={fbLink}
						setFbLink={setFbLink}
						handleSmLinkChange={handleSmLinkChange}
					/>

					<Twitter
						userId={userId}
						apiURL={apiURL}
						token={token}
						setError={setError}
						twLink={twLink}
						setTwLink={setTwLink}
						handleSmLinkChange={handleSmLinkChange}
					/>

					<Instagram
						userId={userId}
						apiURL={apiURL}
						token={token}
						setError={setError}
						igLink={igLink}
						setIgLink={setIgLink}
						handleSmLinkChange={handleSmLinkChange}
					/>

					<Whatsapp
						userId={userId}
						apiURL={apiURL}
						token={token}
						setError={setError}
						waLink={waLink}
						setWaLink={setWaLink}
						handleSmLinkChange={handleSmLinkChange}
					/>

					<TikTok
						userId={userId}
						apiURL={apiURL}
						token={token}
						setError={setError}
						tkLink={tkLink}
						setTkLink={setTkLink}
						handleSmLinkChange={handleSmLinkChange}
					/>
				</div>

				<button className={styles.dashBtn} onClick={handleSaveSocials}>
					Opslaan
				</button>

				<hr />

				{/* ADD LINK SECTIE ADD LINK SECTIE ADD LINK SECTIE ADD LINK SECTIE <--------------------------------------------------> ADD LINK SECTIE ADD LINK SECTIE ADD LINK SECTIE */}

				<h2>Link List</h2>

				<Links
					userId={userId}
					apiURL={apiURL}
					token={token}
					setError={setError}
					links={links}
					setLinks={setLinks}
					setTkLink={setTkLink}
					linkError={linkError}
					setLinkError={setLinkError}
				/>

				<hr />

				{/* CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR <------------------------------------------------------>  CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR*/}

				<h2>Thema's</h2>

				<Themes
					userId={userId}
					apiURL={apiURL}
					token={token}
					color={color}
					setColor={setColor}
					links={links}
				/>
			</section>

			{/* SLUG LINK SLUG LINK SLUG LINK SLUG LINK SLUG LINK <-----------------------------------------------> SLUG LINK SLUG LINK SLUG LINK SLUG LINK SLUG LINK */}

			<aside className={`${styles.slug}`}>
				<AdsLink slug={slug} baseURL={baseURL} />
			</aside>
		</div>
	)
}

export default DashboardPage

export const Head = () => {
	return <Seo title="Dashboard" />
}
