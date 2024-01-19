import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'gatsby'
import axios from 'axios'

import Seo from '../seo'

import { navigate, useLocation } from '@reach/router'
import { getUser, logout, isLoggedIn } from '../../services/auth'

import noavatar from '../../images/noavatar.png'

import Avatar from './dashboard/avatar'
import Profile from './dashboard/profile'
import Username from './dashboard/username'
import Email from './dashboard/email'
import Slug from './dashboard/slug'
import Password from './dashboard/password'
import Terminate from './dashboard/terminate'
import Occupation from './dashboard/occupation'
import Biography from './dashboard/biography'
import Facebook from './dashboard/facebook'
import Twitter from './dashboard/twitter'
import Instagram from './dashboard/instagram'
import Whatsapp from './dashboard/whatsapp'
import TikTok from './dashboard/tiktok'
import Links from './dashboard/links'
import Themes from './dashboard/themes'

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

	return (
		<div className={`${styles.gridContainer}`}>
			{/* SIDEBAR SIDEBAR SIDEBAR SIDEBAR SIDEBAR <--------------------------------------------------------------------------------> SIDEBAR SIDEBAR SIDEBAR SIDEBAR SIDEBAR */}

			<aside id="ads-side" className={styles.sidebar}>
				<h5>
					Hi <span>{username}</span> !
				</h5>

				<button
					href="#"
					title="Uitloggen"
					onClick={e => {
						e.preventDefault()
						logout(() => navigate('/login'))
					}}
				>
					Log uit
				</button>
			</aside>

			{/* PREVIEW PREVIEW PREVIEW PREVIEW PREVIEW <--------------------------------------------------------------------------------> PREVIEW PREVIEW PREVIEW PREVIEW PREVIEW */}

			<section id="ads-preview" className={styles.preview}>
				<div className={styles.iphoneFrame}>
					<img
						src={preview}
						alt=""
						className={styles.iphoneAvatar}
						id="iphone-avatar"
						style={{ border: '3px solid white' }}
					/>
					<p id="iphone-username">{profile}</p>
					<p id="iphone-occupate">{occupate}</p>
					<p id="iphone-biography">{biography}</p>
					<div
						id="iphone-bg"
						className={styles.iphoneBackground}
						style={{
							position: 'relative',
							// width: "100vh",
							height: '100%',
							zindex: 1
						}}
					/>
					<div>
						<ul className={styles.iphoneLinks} id="iphone-linklook">
							{links
								.filter(link => link.visible)
								.slice(0, 4)
								.map(link => (
									<li
										key={link.id}
										id={`link${link.id}`}
										// hidden={!link.visible}
									>
										<a
											href={`https://${link.hyperlink}`}
											rel="noopener noreferrer"
											target="_blank"
											title={`https://${link.hyperlink}`}
										>
											{link.title}
										</a>
									</li>
								))}
						</ul>
					</div>
					<div className={styles.iphoneSocials} id="iphone-iconlook">
						<a
							href={`https://www.facebook.com/${fbLink}`}
							title={`https://www.facebook.com/${fbLink}`}
							rel="noopener noreferrer"
							target="_blank"
							id="fbhide"
						>
							{/* <FaFacebookF size="1.25em" /> */}
						</a>

						<a
							href={`https://twitter.com/${twLink}`}
							title={`https://twitter.com/${twLink}`}
							rel="noopener noreferrer"
							target="_blank"
							id="twhide"
						>
							{/* <FaTwitter size="1.25em" /> */}
						</a>

						<a
							href={`https://www.instagram.com/${igLink}`}
							title={`https://www.instagram.com/${igLink}`}
							rel="noopener noreferrer"
							target="_blank"
							id="ighide"
						>
							{/* <FaInstagram size="1.25em" /> */}
						</a>

						<a
							href={`https://wa.me/${waLink}`}
							title={`https://wa.me/${waLink}`}
							rel="noopener noreferrer"
							target="_blank"
							id="wahide"
						>
							{/* <FaWhatsapp size="1.25em" /> */}
						</a>

						<a
							href={`https://www.tiktok.com/@${tkLink}`}
							title={`https://www.tiktok.com/@${tkLink}`}
							rel="noopener noreferrer"
							target="_blank"
							id="tkhide"
						>
							{/* <SiTiktok size="1.25em" /> */}
						</a>
					</div>
					{/* <img
            src={gatsbyUser.user.gebruiker.background.url}
            alt=""
            className={accountStyles.iphoneBg}
          />{" "} */}
				</div>
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

				<hr className={styles.dashHr} />

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
					/>

					<Twitter
						userId={userId}
						apiURL={apiURL}
						token={token}
						setError={setError}
						twLink={twLink}
						setTwLink={setTwLink}
					/>

					<Instagram
						userId={userId}
						apiURL={apiURL}
						token={token}
						setError={setError}
						igLink={igLink}
						setIgLink={setIgLink}
					/>

					<Whatsapp
						userId={userId}
						apiURL={apiURL}
						token={token}
						setError={setError}
						waLink={waLink}
						setWaLink={setWaLink}
					/>

					<TikTok
						userId={userId}
						apiURL={apiURL}
						token={token}
						setError={setError}
						tkLink={tkLink}
						setTkLink={setTkLink}
					/>
				</div>

				<hr className={styles.dashHr} />

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

				<hr className={styles.dashHr} />

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
				<div>
					<div className={styles.usLinkAfro}>
						<b>Afrodiasphere URL</b>
					</div>

					<div className={styles.usLinkSite}>
						{slug ? (
							<Link
								className={styles.userLink}
								to={`/${slug}/`}
								title={`${baseURL}/${slug}/`}
							>{`✨../${slug}`}</Link>
						) : (
							<p>Link wordt gemaakt...</p>
						)}
					</div>
				</div>
			</aside>
		</div>
	)
}

export default DashboardPage

export const Head = () => {
	return <Seo title="Dashboard" />
}
