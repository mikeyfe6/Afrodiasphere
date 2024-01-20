import React from 'react'

// import * as styles from '../../styles/modules/dashboard/sidebar.module.scss'

// TODO: add a doublecheck for the right password

const Sidebar = ({ username }) => {
	return (
		<>
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
		</>
	)
}

export default Sidebar
