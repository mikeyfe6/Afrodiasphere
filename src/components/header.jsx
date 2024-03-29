import React from 'react'

import { Link, navigate } from 'gatsby'
import PropTypes from 'prop-types'

import { isLoggedIn, logout, isBrowser, getUser } from '../services/auth'

import * as styles from '../styles/modules/header.module.scss'

// import AfroLogo from '../assets/Afrodiasphere-logo.svg'
import afroLogo from '../images/afrodiasphere-logo.png'

const Header = () => {
	const AdsUser = getUser()

	return (
		<header className={styles.navbar}>
			<div>
				{/* <Link to="/" title="Ga naar homepagina">
					<AfroLogo fill="#cc9932" width="75" />
				</Link> */}

				<Link to="/">
					<img src={afroLogo} alt="" />
				</Link>

				<nav>
					<ul>
						{isLoggedIn() && isBrowser() && (
							<li className={styles.loggedUser}>
								<Link
									to={`/${AdsUser.user.username}/`}
									title="Ga naar jouw ADS page"
									activeStyle={{ color: '#cc9932' }}
								>
									{AdsUser.user.username}{' '}
								</Link>
							</li>
						)}

						<li>
							<Link
								to="/"
								title="Afrodiasphere"
								activeStyle={{ color: '#cc9932' }}
							>
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

						<li>
							<a
								href="https://menefex.nl"
								rel="noopener noreferrer"
								target="_blank"
								title="MenefexWMB"
							>
								<strong>
									<i style={{ fontStyle: 'italic' }}>MNFX</i>
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
