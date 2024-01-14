import PropTypes from 'prop-types'
import React from 'react'
import { Link, navigate } from 'gatsby'

import { isLoggedIn, logout, isBrowser, getUser } from '../services/auth'

import * as styles from '../styles/modules/header.module.scss'

import AfroLogo from '../assets/Afrodiasphere-logo.svg'

const Header = () => {
	const AdsUser = getUser()

	return (
		<header className={styles.navbar}>
			<div className={styles.container}>
				<Link to="/" title="Ga naar homepagina">
					<AfroLogo fill="#cc9932" width="75" />
				</Link>

				{isLoggedIn() && isBrowser() && <span>{AdsUser.user.username}</span>}

				<nav>
					<ul>
						<li className={styles.user}>
							{isLoggedIn() && isBrowser() ? (
								<button
									onClick={e => {
										e.preventDefault()
										// e.stopPropagation()
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
							<a
								href="https://menefex.nl"
								rel="noopener noreferrer"
								target="_blank"
								title="MenefexWMB"
							>
								<strong>
									<i>MF</i>
								</strong>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

Header.propTypes = {
	siteTitle: PropTypes.string
}

Header.defaultProps = {
	siteTitle: ``
}

export default Header
