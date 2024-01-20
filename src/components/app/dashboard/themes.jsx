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
	const onRadioChange = async ({ target: { value } }) => {
		setColor(value)

		const params = {
			bgfree: value
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
					styles.yellowStyleUsername,
					styles.yellowStyleOccupate,
					styles.yellowStyleBiography,
					styles.yellowStyleIcons,
					styles.yellowStyle,
					styles.yellowStyleLinks
				)

				break
			case 'grijs':
				iphonePreviewStyle(
					styles.grayStyleUsername,
					styles.grayStyleOccupate,
					styles.grayStyleBiography,
					styles.grayStyleIcons,
					styles.grayStyle,
					styles.grayStyleLinks
				)

				break
			case 'roze':
				iphonePreviewStyle(
					styles.pinkStyleUsername,
					styles.pinkStyleOccupate,
					styles.pinkStyleBiography,
					styles.pinkStyleIcons,
					styles.pinkStyle,
					styles.pinkStyleLinks
				)

				break
			case 'zwart':
				iphonePreviewStyle(
					styles.blackStyleUsername,
					styles.blackStyleOccupate,
					styles.blackStyleBiography,
					styles.blackStyleIcons,
					styles.blackStyle,
					styles.blackStyleLinks
				)

				break
			case 'bruin':
				iphonePreviewStyle(
					styles.brownStyleUsername,
					styles.brownStyleOccupate,
					styles.brownStyleBiography,
					styles.brownStyleIcons,
					styles.brownStyle,
					styles.brownStyleLinks
				)

				break
			case 'groen':
				iphonePreviewStyle(
					styles.greenStyleUsername,
					styles.greenStyleOccupate,
					styles.greenStyleBiography,
					styles.greenStyleIcons,
					styles.greenStyle,
					styles.greenStyleLinks
				)

				break
			case 'afrotheme':
				iphonePreviewStyle(
					styles.afroStyleUsername,
					styles.afroStyleOccupate,
					styles.afroStyleBiography,
					styles.afroStyleIcons,
					styles.afroStyle,
					styles.afroStyleLinks
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

		getColor()
		changeHeadingBg()
	}, [token, color, links])

	return (
		<ul className={styles.chooseTheme}>
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
					/>
					<div
						id="currentYellow"
						className={`${styles.yellowTheme} ${color === 'geel' ? styles.currentTheme : ''}`}
					>
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
					/>
					<div
						id="currentGrey"
						className={`${styles.grayTheme} ${color === 'grijs' ? styles.currentTheme : ''}`}
					>
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
					/>
					<div
						className={`${styles.pinkTheme} ${color === 'roze' ? styles.currentTheme : ''}`}
					>
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
					/>
					<div
						className={`${styles.blackTheme} ${color === 'zwart' ? styles.currentTheme : ''}`}
					>
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
					/>
					<div
						className={`${styles.brownTheme} ${color === 'bruin' ? styles.currentTheme : ''}`}
					>
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
					/>
					<div
						className={`${styles.greenTheme} ${color === 'groen' ? styles.currentTheme : ''}`}
					>
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
					/>
					<div
						className={`${styles.afroTheme} ${color === 'afrotheme' ? styles.currentTheme : ''}`}
					>
						<div className={styles.afrolinks} />
						<div className={styles.afrolinks} />
						<div className={styles.afrolinks} />
					</div>
				</label>
			</li>
		</ul>
	)
}

export default Themes
