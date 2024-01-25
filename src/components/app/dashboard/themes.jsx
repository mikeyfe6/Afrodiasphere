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
	setColor
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

	useEffect(() => {
		const getColor = async () => {
			const res = await axios.get(`${apiURL}/api/instanties`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setColor(res.data.bgfree)
		}

		getColor()
	}, [token])

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
							event.preventDefault()
						}}
					/>
					<div
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
