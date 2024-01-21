import React from 'react'

import * as styles from '../../../styles/modules/dashboard/preview.module.scss'

// TODO: add a doublecheck for the right password

const Preview = ({
	preview,
	profile,
	occupate,
	biography,
	links,
	fbLink,
	twLink,
	igLink,
	waLink,
	tkLink
}) => {
	return (
		<div className={styles.iphoneFrame}>
			<img
				src={preview}
				alt=""
				className={styles.iphoneAvatar}
				id="iphone-avatar"
			/>
			<p id="iphone-username">{profile}</p>
			<p id="iphone-occupate">{occupate}</p>
			<p id="iphone-biography">{biography}</p>
			<div id="iphone-bg" />
			<div>
				<ul className={styles.iphoneLinks} id="iphone-links">
					{links
						.filter(link => link.visible)
						.slice(0, 4)
						.map((link, index) => (
							<li key={index} id={`link${link.id}`} hidden={!link.visible}>
								<a
									href={`https://${link.hyperlink}`}
									rel="noopener noreferrer"
									target="_blank"
									title={`https://${link.hyperlink}`}
								>
									{link.title}
								</a>
							</li>
						))}
				</ul>
			</div>
			<div className={styles.iphoneSocials} id="iphone-icons">
				{fbLink && fbLink.length > 2 && (
					<a
						href={`https://www.facebook.com/${fbLink}`}
						title={`https://www.facebook.com/${fbLink}`}
						rel="noopener noreferrer"
						target="_blank"
					>
						<i className="fa-brands fa-facebook-f" />
					</a>
				)}

				{twLink && twLink.length > 2 && (
					<a
						href={`https://twitter.com/${twLink}`}
						title={`https://twitter.com/${twLink}`}
						rel="noopener noreferrer"
						target="_blank"
					>
						<i className="fa-brands fa-x-twitter" />
					</a>
				)}

				{igLink && igLink.length > 2 && (
					<a
						href={`https://www.instagram.com/${igLink}`}
						title={`https://www.instagram.com/${igLink}`}
						rel="noopener noreferrer"
						target="_blank"
					>
						<i className="fa-brands fa-instagram" />
					</a>
				)}

				{waLink && waLink.length > 2 && (
					<a
						href={`https://wa.me/${waLink}`}
						title={`https://wa.me/${waLink}`}
						rel="noopener noreferrer"
						target="_blank"
					>
						<i className="fa-brands fa-whatsapp" />
					</a>
				)}

				{tkLink && tkLink.length > 2 && (
					<a
						href={`https://www.tiktok.com/@${tkLink}`}
						title={`https://www.tiktok.com/@${tkLink}`}
						rel="noopener noreferrer"
						target="_blank"
						id="tkhide"
					>
						<i className="fa-brands fa-tiktok" />
					</a>
				)}
			</div>
			{/* <img
            src={gatsbyUser.user.gebruiker.background.url}
            alt=""
            className={accountStyles.iphoneBg}
          />{" "} */}
		</div>
	)
}

export default Preview
