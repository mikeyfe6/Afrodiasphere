import React from 'react'

// import * as styles from '../../styles/modules/dashboard/sidebar.module.scss'

import Spinner from '../../spinner'

// TODO: add a doublecheck for the right password

const Sidebar = ({ username, loadingData }) => {
	return (
		<>
			{loadingData ? (
				<Spinner />
			) : (
				<>
					<h5>
						Hi <u>{username}</u> !
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
				</>
			)}
		</>
	)
}

export default Sidebar
