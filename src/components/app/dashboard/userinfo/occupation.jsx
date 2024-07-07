import React, { useEffect, useState } from 'react'

import axios from 'axios'

import * as occupationStyles from '../../../../styles/modules/dashboard/occupation.module.scss'

const Occupation = ({
	userId,
	apiURL,
	token,
	setLoading,
	setError,
	occupate,
	setOccupate
}) => {
	const [expandedSection, setExpandedSection] = useState(null)

	const onOccupateChange = async e => {
		setOccupate(e.target.value)

		const params = {
			occupate: e.target.value
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
		const occupationCategories = {
			bedrijf: 'Werkgevers en Organisaties',
			stichting: 'Werkgevers en Organisaties',
			'non-profit organisatie': 'Werkgevers en Organisaties',
			'zelfstandig ondernemer': 'Zelfstandigen en Freelancers',
			freelancer: 'Zelfstandigen en Freelancers',
			artiest: 'Creatieve en Kunstzinnige Beroepen',
			musicus: 'Creatieve en Kunstzinnige Beroepen',
			schrijver: 'Creatieve en Kunstzinnige Beroepen',
			'beeldend kunstenaar': 'Creatieve en Kunstzinnige Beroepen',
			docent: 'Onderwijs en Onderzoek',
			onderzoeker: 'Onderwijs en Onderzoek',
			student: 'Onderwijs en Onderzoek',
			stagiair: 'Onderwijs en Onderzoek',
			technicus: 'Technische en Vakgerichte Beroepen',
			ingenieur: 'Technische en Vakgerichte Beroepen',
			'medisch professional': 'Gezondheidszorg en Welzijn',
			verzorger: 'Gezondheidszorg en Welzijn',
			'administratief medewerker': 'Administratie en Kantoorwerk',
			'kantoor medewerker': 'Administratie en Kantoorwerk',
			hobbyist: 'Overige Beroepen',
			vrijwilliger: 'Overige Beroepen',
			gepensioneerde: 'Overige Beroepen',
			werkzoekende: 'Overige Beroepen',
			overig: 'Overige Beroepen',
			geen: 'Overige Beroepen'
		}

		const currentCategory = occupationCategories[occupate]
		if (currentCategory) {
			setExpandedSection(currentCategory)
		}
	}, [occupate])

	const toggleSection = section => {
		setExpandedSection(prevSection =>
			prevSection === section ? null : section
		)
	}

	return (
		<form className={occupationStyles.occupation}>
			<fieldset>
				<legend>Occupatie</legend>

				<div>
					{[
						{
							category: 'Werkgevers en Organisaties',
							occupations: ['bedrijf', 'stichting', 'non-profit organisatie']
						},
						{
							category: 'Zelfstandigen en Freelancers',
							occupations: ['zelfstandig ondernemer', 'freelancer']
						},
						{
							category: 'Creatieve en Kunstzinnige Beroepen',
							occupations: [
								'artiest',
								'musicus',
								'schrijver',
								'beeldend kunstenaar'
							]
						},
						{
							category: 'Onderwijs en Onderzoek',
							occupations: ['docent', 'onderzoeker', 'student', 'stagiair']
						},
						{
							category: 'Technische en Vakgerichte Beroepen',
							occupations: ['technicus', 'ingenieur']
						},
						{
							category: 'Gezondheidszorg en Welzijn',
							occupations: ['medisch professional', 'verzorger']
						},
						{
							category: 'Administratie en Kantoorwerk',
							occupations: ['administratief medewerker', 'kantoor medewerker']
						},
						{
							category: 'Overige Beroepen',
							occupations: [
								'hobbyist',
								'vrijwilliger',
								'gepensioneerde',
								'werkzoekende',
								'overig',
								'geen'
							]
						}
					].map(({ category, occupations }) => (
						<div key={category} className={occupationStyles.collapsible}>
							<button
								type="button"
								onClick={() => toggleSection(category)}
								className={`${occupationStyles.category} ${expandedSection === category ? occupationStyles.active : ''}`}
							>
								{category}
							</button>
							{expandedSection === category && (
								<div className={occupationStyles.choice}>
									{occupations.map(occupation => (
										<div key={occupation}>
											<input
												id={occupation.replace(/\s+/g, '')}
												type="radio"
												value={occupation}
												name="occupate"
												checked={occupate === occupation}
												onChange={onOccupateChange}
											/>
											<label
												htmlFor={occupation.replace(/\s+/g, '')}
												title={`Ik ben ${occupation}`}
											>
												{occupation.charAt(0).toUpperCase() +
													occupation.slice(1)}
											</label>
										</div>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</fieldset>
		</form>
	)
}

export default Occupation
