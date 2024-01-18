import React, { useLayoutEffect, useState, useEffect } from 'react'

import { Link } from 'gatsby'
import axios from 'axios'

import Seo from '../components/seo'

import AdsLayout from '../components/adslayout'

import '../styles/themes.scss'

import noavatar from '../images/noavatar.png'

import afroLogo from '../images/afrodiasphere-logo.png'

// import { getUser } from "../services/auth"

// const gatsbyUser = getUser()

const apiURL = process.env.GATSBY_BACKEND_URL

const AdsTemplate = ({ pageContext: { persoon, slug, id } }) => {
	const [color, setColor] = useState('')
	const [avatar, setAvatar] = useState(null)
	const [username, setUsername] = useState('')
	const [occupate, setOccupate] = useState('')
	const [biography, setBiography] = useState('')
	const [links, setLinks] = useState([])

	const [fbLink, setFbLink] = useState('')
	const [twLink, setTwLink] = useState('')
	const [igLink, setIgLink] = useState('')
	const [waLink, setWaLink] = useState('')
	const [tkLink, setTkLink] = useState('')

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
			setUsername(res.data.data.attributes.profiel)
			setOccupate(res.data.data.attributes.occupate)
			setBiography(res.data.data.attributes.biografie)
			setFbLink(res.data.data.attributes.facebooklink)
			setTwLink(res.data.data.attributes.twitterlink)
			setIgLink(res.data.data.attributes.instagramlink)
			setWaLink(res.data.data.attributes.whatsapplink)
			setTkLink(res.data.data.attributes.tiktoklink)

			if (!res.data.data.attributes.avatar.data) {
				return setAvatar(noavatar)
			} else {
				setAvatar(res.data.data.attributes.avatar.data.attributes?.url)
			}
		}
		getLinks()
	}, [id, slug, persoon.username])

	useEffect(() => {
		var fbhideman = document.getElementById('fbhidesm')
		if (fbLink < 9) {
			fbhideman.style.display = 'none'
		} else {
			fbhideman.style.display = 'block'
		}
		var twhideman = document.getElementById('twhidesm')
		if (twLink < 9) {
			twhideman.style.display = 'none'
		} else {
			twhideman.style.display = 'block'
		}
		var ighideman = document.getElementById('ighidesm')
		if (igLink < 9) {
			ighideman.style.display = 'none'
		} else {
			ighideman.style.display = 'block'
		}
		var wahideman = document.getElementById('wahidesm')
		if (waLink < 9) {
			wahideman.style.display = 'none'
		} else {
			wahideman.style.display = 'block'
		}
		var tkhideman = document.getElementById('tkhidesm')
		if (tkLink < 9) {
			tkhideman.style.display = 'none'
		} else {
			tkhideman.style.display = 'block'
		}
	}, [fbLink, twLink, igLink, waLink, tkLink])

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
				<img src={avatar} alt="avatar" />

				<h1>{username}</h1>

				<p>{occupate}</p>

				<p>{biography}</p>

				<ul>
					{links.slice(0, 20).map(link => (
						<li
							key={link.id}
							className={`theme-${color}-links`}
							hidden={!link.visible}
						>
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

				<div className={`theme-${color}-icons`}>
					<a
						href={`https://www.facebook.com/${fbLink}`}
						rel="noopener noreferrer"
						target="_blank"
						id="fbhidesm"
					>
						<i className="fa-brands fa-facebook-f fa-xl" />
					</a>

					<a
						href={`https://twitter.com/${twLink}`}
						rel="noopener noreferrer"
						target="_blank"
						id="twhidesm"
					>
						<i className="fa-brands fa-x-twitter" />
					</a>

					<a
						href={`https://www.instagram.com/${igLink}`}
						rel="noopener noreferrer"
						target="_blank"
						id="ighidesm"
					>
						<i className="fa-brands fa-instagram fa-xl" />
					</a>

					<a
						href={`https://wa.me/${waLink}`}
						rel="noopener noreferrer"
						target="_blank"
						id="wahidesm"
					>
						{/* <FaWhatsapp size="2em" /> */}
					</a>

					<a
						href={`https://www.tiktok.com/@${tkLink}`}
						rel="noopener noreferrer"
						target="_blank"
						id="tkhidesm"
					>
						<i className="fa-brands fa-tiktok fa-xl" />
					</a>

					{/* <a
						href={`https://www.tiktok.com/@${tkLink}`}
						rel="noopener noreferrer"
						target="_blank"
						id="tkhidesm"
					>
						<i className="fa-brands fa-linkedin fa-xl" />
					</a> */}
				</div>
				<Link to="/">
					<img src={afroLogo} alt="" className={`theme-footer`} />
				</Link>
			</div>
		</AdsLayout>
	)
}

export default AdsTemplate

export const Head = ({ pageContext: { persoon } }) => {
	return <Seo title={persoon.username} />
}
