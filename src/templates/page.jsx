import React, { useLayoutEffect, useState, useEffect } from 'react'

import { Link } from 'gatsby'
import axios from 'axios'
import GoogleMapReact from 'google-map-react'

import { isLoggedIn, isBrowser, getUser } from '../services/auth'

import Seo from '../components/seo'

import AdsLayout from '../components/adslayout'

import noavatar from '../images/noavatar.png'
import afroLogo from '../images/afrodiasphere-logo.png'

import * as mapsStyles from '../styles/modules/maps.module.scss'
import '../styles/adspage.scss'

const defaultProps = {
	center: {
		lat: 52.30994007862562,
		lng: 4.974422834381031
	},
	zoom: 15
}

const apiURL = process.env.GATSBY_BACKEND_URL

const AdsTemplate = ({ pageContext: { persoon, slug, id } }) => {
	const [color, setColor] = useState('zwart')
	const [avatar, setAvatar] = useState(noavatar)
	const [username, setUsername] = useState('')
	const [occupate, setOccupate] = useState('')
	const [biography, setBiography] = useState('')
	const [links, setLinks] = useState([])

	const [telephone, setTelephone] = useState('')
	const [mail, setMail] = useState('')
	const [address, setAddress] = useState({
		location: '',
		latitude: null,
		longitude: null
	})

	const [fbLink, setFbLink] = useState('')
	const [twLink, setTwLink] = useState('')
	const [igLink, setIgLink] = useState('')
	const [waLink, setWaLink] = useState('')
	const [tkLink, setTkLink] = useState('')

	const AdsUser = getUser()

	useLayoutEffect(() => {
		const getLinks = async () => {
			const res = await axios.get(`${apiURL}/api/instanties/${id}/?populate=*`)
			const reslinks = await axios.get(`${apiURL}/api/connections?populate=*`)
			var allLinks = reslinks.data
			var sortedLinks = allLinks.filter(
				element => element.links.username === persoon.username
			)

			setLinks(sortedLinks)
			setColor(res.data.data.attributes.bgfree)
			setUsername(res.data.data.attributes.profile)
			setOccupate(res.data.data.attributes.occupate)
			setBiography(res.data.data.attributes.biography)
			setTelephone(res.data.data.attributes.telephone)
			setMail(res.data.data.attributes.email)
			setFbLink(res.data.data.attributes.facebooklink)
			setTwLink(res.data.data.attributes.twitterlink)
			setIgLink(res.data.data.attributes.instagramlink)
			setWaLink(res.data.data.attributes.whatsapplink)
			setTkLink(res.data.data.attributes.tiktoklink)
			setAddress(res.data.data.attributes.address)

			if (!res.data.data.attributes.avatar.data) {
				return setAvatar(noavatar)
			} else {
				setAvatar(res.data.data.attributes.avatar.data.attributes?.url)
			}
		}
		getLinks()
	}, [id, slug, persoon.username])

	const Marker = ({ lat, lng }) => {
		return (
			<div data-lat={lat} data-lng={lng} className={mapsStyles.marker}>
				<img src={avatar} alt={username} />
			</div>
		)
	}

	return (
		<AdsLayout>
			{/* <Img
        fluid={data.strapiInstantie.background.childImageSharp.fluid}
        style={{
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          textAlign: "center",
          // opacity: 0.1,
        }}
      /> */}

			<div className={`theme-${color}`}>
				<div className={`theme-avatar-contact`}>
					{mail && (
						<a
							href={`mailto:${mail}`}
							rel="noopener noreferrer"
							target="_blank"
							className={`theme-email`}
						>
							<i className="fa-solid fa-envelope fa-xl" />
						</a>
					)}

					<img src={avatar} alt={username} />

					{telephone && (
						<a
							href={`tel:${telephone}`}
							rel="noopener noreferrer"
							target="_blank"
							className={`theme-telephone`}
						>
							<i className="fa-solid fa-phone fa-xl" />
						</a>
					)}
				</div>

				<h1 className={`theme-${color}-username`}>{username}</h1>

				<p className={`theme-${color}-occupate`}>{occupate}</p>

				<p className={`theme-${color}-biography`}>{biography}</p>

				<ul className={`theme-${color}-links`}>
					{links.slice(0, 20).map(link => (
						<li key={link.id} hidden={!link.visible}>
							<a
								href={`https://${link.hyperlink}`}
								rel="noopener noreferrer"
								target="_blank"
							>
								{link.title}
							</a>
						</li>
					))}
				</ul>

				{address && (
					<p className={`theme-${color}-location`}>
						<i className="fa-solid fa-map-location-dot fa-xl" />
						<a
							href={`https://www.google.com/maps?q=${address.latitude},${address.longitude}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{address.location}
						</a>
					</p>
				)}

				{address && (
					<div
						className={`theme-${color}-maps ${mapsStyles.maps} ${mapsStyles.adsPage}`}
					>
						<GoogleMapReact
							bootstrapURLKeys={{
								key: process.env.GATSBY_GOOGLE_MAPS_KEY,
								language: 'nl',
								region: 'NL'
							}}
							defaultCenter={defaultProps.center}
							defaultZoom={defaultProps.zoom}
							center={
								address.latitude !== null && address.longitude !== null
									? { lat: address.latitude, lng: address.longitude }
									: defaultProps.center
							}
						>
							{address.latitude !== null && address.longitude !== null && (
								<Marker lat={address.latitude} lng={address.longitude} />
							)}
						</GoogleMapReact>
					</div>
				)}

				<div className={`theme-${color}-icons`}>
					{fbLink && fbLink.length > 1 && (
						<a
							href={`https://www.facebook.com/${fbLink}`}
							rel="noopener noreferrer"
							target="_blank"
							id="fb"
						>
							<i className="fa-brands fa-facebook-f" />
						</a>
					)}

					{twLink && twLink.length > 1 && (
						<a
							href={`https://twitter.com/${twLink}`}
							rel="noopener noreferrer"
							target="_blank"
							id="twhidesm"
						>
							<i className="fa-brands fa-x-twitter" />
						</a>
					)}

					{igLink && igLink.length > 1 && (
						<a
							href={`https://www.instagram.com/${igLink}`}
							rel="noopener noreferrer"
							target="_blank"
							id="ighidesm"
						>
							<i className="fa-brands fa-instagram" />
						</a>
					)}

					{waLink && waLink.length > 1 && (
						<a
							href={`https://wa.me/${waLink}`}
							rel="noopener noreferrer"
							target="_blank"
							id="wahidesm"
						>
							<i className="fa-brands fa-whatsapp" />
						</a>
					)}

					{tkLink && tkLink.length > 1 && (
						<a
							href={`https://www.tiktok.com/@${tkLink}`}
							rel="noopener noreferrer"
							target="_blank"
							id="tkhidesm"
						>
							<i className="fa-brands fa-tiktok" />
						</a>
					)}

					{/* <a
						href={`https://www.tiktok.com/@${tkLink}`}
						rel="noopener noreferrer"
						target="_blank"
						id="tkhidesm"
					>
						<i className="fa-brands fa-linkedin fa-xl" />
					</a> */}
				</div>
				<Link to="/" className={`theme-footer`}>
					<img src={afroLogo} alt="" />
				</Link>
			</div>
			{isLoggedIn() && isBrowser() && (
				<div className="ads-user">
					<Link to={`/dashboard/`} title="Ga naar jouw dashboard">
						Dashboard
					</Link>

					<Link to={`/${AdsUser.user.username}/`} title="Ga naar jouw ADS page">
						{AdsUser.user.username}
					</Link>
				</div>
			)}
		</AdsLayout>
	)
}

export default AdsTemplate

export const Head = ({ pageContext: { profile, biography, slug, avatar } }) => {
	return (
		<Seo
			title={profile}
			description={biography}
			pathname={'/' + slug + '/'}
			image={avatar ? avatar.url : undefined}
		/>
	)
}
