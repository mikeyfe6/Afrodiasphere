import React, { useEffect } from 'react'

import axios from 'axios'

import * as styles from '../../../styles/modules/dashboard/themes.module.scss'

// TODO: add a doublecheck for the right password

const Themes = ({
	userId,
	apiURL,
	token,
	setLoading,
	setError,
	color,
	setColor,
	links
}) => {
	const onRadioChange = async e => {
		setColor(e.target.value)

		const params = {
			bgfree: e.target.value
		}
		await axios.put(
			`${apiURL}/api/instanties/${userId}`,
			{ data: params },
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)
	}

	const changeHeadingBg = color => {
		const iphonePreviewStyle = (
			username,
			occupate,
			biography,
			icons,
			bg,
			links
		) => {
			const iphoneUsernameStyle = document.getElementById('iphone-username')
			const iphoneOccupateStyle = document.getElementById('iphone-occupate')
			const iphoneBiographyStyle = document.getElementById('iphone-biography')
			const iphoneIconLookStyle = document.getElementById('iphone-iconlook')
			const iphoneBgStyle = document.getElementById('iphone-bg')

			const iphoneLinkStyle = className => {
				for (i = 0; i < c.length; i++) {
					c[i].className = className
				}
			}

			let c = document.getElementById('iphone-linklook').children
			let i

			iphoneUsernameStyle.className = username
			iphoneOccupateStyle.className = occupate
			iphoneBiographyStyle.className = biography
			iphoneIconLookStyle.className = icons
			iphoneBgStyle.className = bg
			iphoneLinkStyle(links)
		}

		switch (color) {
			case 'geel':
				iphonePreviewStyle(
					styles.yellowstyleUsername,
					styles.yellowstyleOccupate,
					styles.yellowstyleBiography,
					styles.yellowstyleIcons,
					styles.yellowstyle,
					styles.yellowstyleLinks
				)

				break
			case 'grijs':
				iphonePreviewStyle(
					styles.graystyleUsername,
					styles.graystyleOccupate,
					styles.graystyleBiography,
					styles.graystyleIcons,
					styles.graystyle,
					styles.graystyleLinks
				)

				break
			case 'roze':
				iphonePreviewStyle(
					styles.pinkstyleUsername,
					styles.pinkstyleOccupate,
					styles.pinkstyleBiography,
					styles.pinkstyleIcons,
					styles.pinkstyle,
					styles.pinkstyleLinks
				)

				break
			case 'zwart':
				iphonePreviewStyle(
					styles.blackstyleUsername,
					styles.blackstyleOccupate,
					styles.blackstyleBiography,
					styles.blackstyleIcons,
					styles.blackstyle,
					styles.blackstyleLinks
				)

				break
			case 'bruin':
				iphonePreviewStyle(
					styles.brownstyleUsername,
					styles.brownstyleOccupate,
					styles.brownstyleBiography,
					styles.brownstyleIcons,
					styles.brownstyle,
					styles.brownstyleLinks
				)

				break
			case 'groen':
				iphonePreviewStyle(
					styles.greenstyleUsername,
					styles.greenstyleOccupate,
					styles.greenstyleBiography,
					styles.greenstyleIcons,
					styles.greenstyle,
					styles.greenstyleLinks
				)

				break
			case 'afrotheme':
				iphonePreviewStyle(
					styles.afrospecstyleUsername,
					styles.afrospecstyleOccupate,
					styles.afrospecstyleBiography,
					styles.afrospecstyleIcons,
					styles.afrospecstyle,
					styles.afrospecstyleLinks
				)
				break
			default:
				color = 'afrotheme'
		}
	}

	useEffect(() => {
		const getColor = async () => {
			const res = await axios.get(`${apiURL}/api/instanties`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setColor(res.data.bgfree)
			changeHeadingBg(res.data.bgfree)
		}

		if (color === 'geel') {
			document
				.getElementById('currentYellow')
				.classList.add(styles.currentStyle)
		} else {
			document
				.getElementById('currentYellow')
				.classList.remove(styles.currentStyle)
		}
		if (color === 'grijs') {
			document.getElementById('currentGrey').classList.add(styles.currentStyle)
		} else {
			document
				.getElementById('currentGrey')
				.classList.remove(styles.currentStyle)
		}
		if (color === 'roze') {
			document.getElementById('currentPink').classList.add(styles.currentStyle)
		} else {
			document
				.getElementById('currentPink')
				.classList.remove(styles.currentStyle)
		}
		if (color === 'zwart') {
			document.getElementById('currentBlack').classList.add(styles.currentStyle)
		} else {
			document
				.getElementById('currentBlack')
				.classList.remove(styles.currentStyle)
		}
		if (color === 'bruin') {
			document.getElementById('currentBrown').classList.add(styles.currentStyle)
		} else {
			document
				.getElementById('currentBrown')
				.classList.remove(styles.currentStyle)
		}
		if (color === 'groen') {
			document.getElementById('currentGreen').classList.add(styles.currentStyle)
		} else {
			document
				.getElementById('currentGreen')
				.classList.remove(styles.currentStyle)
		}
		if (color === 'afrotheme') {
			document.getElementById('currentAfro').classList.add(styles.currentStyle)
		} else {
			document
				.getElementById('currentAfro')
				.classList.remove(styles.currentStyle)
		}

		getColor()
		changeHeadingBg()
	}, [token, color, links])

	return (
		<ul className={styles.pickColor}>
			<li className={styles.chooseColor}>
				<label title="Geel / Zwart">
					<input
						type="radio"
						value="geel"
						checked={color === 'geel'}
						onChange={onRadioChange}
						onClick={event => {
							changeHeadingBg('geel')
							event.preventDefault()
						}}
						style={{ display: 'none' }}
					/>
					<div id="currentYellow" className={styles.yellowtheme}>
						<div className={styles.yellowlinks} />
						<div className={styles.yellowlinks} />
						<div className={styles.yellowlinks} />
					</div>
				</label>
			</li>

			<li className={styles.chooseColor}>
				<label title="Grijs / Wit">
					<input
						type="radio"
						value="grijs"
						checked={color === 'grijs'}
						onChange={onRadioChange}
						onClick={event => {
							changeHeadingBg('grijs')
							event.preventDefault()
						}}
						style={{ display: 'none' }}
					/>
					<div id="currentGrey" className={styles.graytheme}>
						<div className={styles.graylinks} />
						<div className={styles.graylinks} />
						<div className={styles.graylinks} />
					</div>
				</label>
			</li>

			<li className={styles.chooseColor}>
				<label title="Roze / Grijs">
					<input
						type="radio"
						value="roze"
						checked={color === 'roze'}
						onChange={onRadioChange}
						onClick={event => {
							changeHeadingBg('roze')
							event.preventDefault()
						}}
						style={{ display: 'none' }}
					/>
					<div id="currentPink" className={styles.pinktheme}>
						<div className={styles.pinklinks} />
						<div className={styles.pinklinks} />
						<div className={styles.pinklinks} />
					</div>
				</label>
			</li>

			<li className={styles.chooseColor}>
				<label title="Zwart / Grijs">
					<input
						type="radio"
						value="zwart"
						checked={color === 'zwart'}
						onChange={onRadioChange}
						onClick={event => {
							changeHeadingBg('zwart')
							event.preventDefault()
						}}
						style={{ display: 'none' }}
					/>
					<div id="currentBlack" className={styles.blacktheme}>
						<div className={styles.blacklinks} />
						<div className={styles.blacklinks} />
						<div className={styles.blacklinks} />
					</div>
				</label>
			</li>

			<li className={styles.chooseColor}>
				<label title="Rood / Wit">
					<input
						type="radio"
						value="bruin"
						checked={color === 'bruin'}
						onChange={onRadioChange}
						onClick={event => {
							changeHeadingBg('bruin')
							event.preventDefault()
						}}
						style={{ display: 'none' }}
					/>
					<div id="currentBrown" className={styles.browntheme}>
						<div className={styles.brownlinks} />
						<div className={styles.brownlinks} />
						<div className={styles.brownlinks} />
					</div>
				</label>
			</li>

			<li className={styles.chooseColor}>
				<label title="Groen / Wit">
					<input
						type="radio"
						value="groen"
						checked={color === 'groen'}
						onChange={onRadioChange}
						onClick={event => {
							changeHeadingBg('groen')
							event.preventDefault()
						}}
						style={{ display: 'none' }}
					/>
					<div id="currentGreen" className={styles.greentheme}>
						<div className={styles.greenlinks} />
						<div className={styles.greenlinks} />
						<div className={styles.greenlinks} />
					</div>
				</label>
			</li>

			<li className={styles.chooseColor}>
				<label title="Koperbruin / Zwart">
					<input
						type="radio"
						value="afrotheme"
						checked={color === 'afrotheme'}
						onChange={onRadioChange}
						onClick={event => {
							changeHeadingBg('afrotheme')
							event.preventDefault()
						}}
						style={{ display: 'none' }}
					/>
					<div id="currentAfro" className={styles.afrospectheme}>
						<div className={styles.afrospeclinks} />
						<div className={styles.afrospeclinks} />
						<div className={styles.afrospeclinks} />
					</div>
				</label>
			</li>
		</ul>
	)
}

export default Themes
