import React from 'react'
import PropTypes from 'prop-types'

const AdsLayout = ({ children }) => {
	return (
		<>
			<div style={{ height: '100vh', marginBottom: '-58px' }}>
				<main>{children}</main>
			</div>
		</>
	)
}

AdsLayout.propTypes = {
	children: PropTypes.node.isRequired
}

export default AdsLayout
