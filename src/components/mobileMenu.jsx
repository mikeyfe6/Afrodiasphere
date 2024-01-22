import React, { useRef, useEffect } from 'react'

import { Link, navigate } from 'gatsby'

import { isLoggedIn, logout, isBrowser, getUser } from '../services/auth'

import * as styles from '../styles/modules/mobileMenu.module.scss'

const MobileMenu = ({ isMenuOpen, setMenuOpen }) => {
	const AdsUser = getUser()
	const initialScrollY = useRef(window.scrollY)

	const toggleMenu = () => {
		if (!isMenuOpen) {
			initialScrollY.current = window.scrollY
		}
		setMenuOpen(!isMenuOpen)

		if (!isMenuOpen) {
			setTimeout(() => {
				setMenuOpen(false)
			}, 6000)
		}
	}

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > initialScrollY.current + 250) {
				setMenuOpen(false)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [isMenuOpen])

	return (
		<header className={styles.mobileMenuContainer}>
			<button className={styles.hamburger} onClick={toggleMenu}>
				<i className="fa-solid fa-bars fa-lg" />
			</button>

			<div className={styles.username}>
				{isLoggedIn() && isBrowser() ? (
					<Link to={`/${AdsUser.user.username}/`} title="Ga naar jouw ADS page">
						{AdsUser.user.username}{' '}
					</Link>
				) : (
					<Link to="/login/" title="Inloggen">
						Log in / Registreer
					</Link>
				)}
			</div>

			<div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
				<ul>
					<li>
						<Link to="/" title="Homepage" activeStyle={{ color: '#cc9932' }}>
							Home
						</Link>
					</li>
					{isLoggedIn() && isBrowser() && (
						<li>
							<Link
								to="/dashboard/"
								activeStyle={{ color: '#cc9932' }}
								title="Dashboard"
							>
								Dashboard
							</Link>
						</li>
					)}
					<li>
						{isLoggedIn() && isBrowser() ? (
							<button
								onClick={e => {
									e.preventDefault()
									logout(() => navigate('/login'))
								}}
								href="#"
								title="Uitloggen"
							>
								Log uit
							</button>
						) : (
							<Link
								to="/login/"
								title="Inloggen"
								activeStyle={{ color: '#cc9932' }}
							>
								Inloggen
							</Link>
						)}
					</li>
				</ul>
			</div>
		</header>
	)
}

export default MobileMenu
