import React from 'react';
import renderer from 'react-test-renderer';

import RaceTrack from './RaceTrack';

describe('RaceTrack tests', () => {
	const car = {
		image:
			'https://www.mazdausa.com/siteassets/vehicles/2017/m3s/trims/sport/17-m3s-sp-25d-snowflake-white.png',
		speed: 235,
		description:
			'The Fiat Punto is a supermini car produced by the Italian manufacturer Fiat since 1993.',
		name: 'Mazda 3',
		id: 2
	};

	const createNodeMock = element => {
		// mock ref inside RaceTrack component
		if (element.props.className.indexOf('race-track__car') > -1) {
			return {
				addEventListener() {},
				removeEventListener() {}
			};
		}

		return null;
	};

	it('RaceTrack renders correctly with Mazda 3 car data', () => {
		const trackDistance = 0;

		const tree = renderer
			.create(<RaceTrack {...car} trackDistance={trackDistance} />, {
				createNodeMock
			})
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('RaceTrack renders correctly with gold, silver, bronze place and fourth place', () => {
		const trackDistance = 0;

		const firstPlace = 0; // gold place
		const firstPlaceRaceTrack = renderer
			.create(
				<RaceTrack
					{...car}
					place={firstPlace}
					trackDistance={trackDistance}
				/>,
				{
					createNodeMock
				}
			)
			.toJSON();
		expect(firstPlaceRaceTrack).toMatchSnapshot();

		const secondPlace = 1; // silver place
		const secondPlaceRaceTrack = renderer
			.create(
				<RaceTrack
					{...car}
					place={secondPlace}
					trackDistance={trackDistance}
				/>,
				{
					createNodeMock
				}
			)
			.toJSON();
		expect(secondPlaceRaceTrack).toMatchSnapshot();

		const thirdPlace = 2; // bronze place
		const thirdPlaceRaceTrack = renderer
			.create(
				<RaceTrack
					{...car}
					place={thirdPlace}
					trackDistance={trackDistance}
				/>,
				{
					createNodeMock
				}
			)
			.toJSON();
		expect(thirdPlaceRaceTrack).toMatchSnapshot();

		const fourthPlace = 3; // no reward place
		const fourthPlaceRaceTrack = renderer
			.create(
				<RaceTrack
					{...car}
					place={fourthPlace}
					trackDistance={trackDistance}
				/>,
				{
					createNodeMock
				}
			)
			.toJSON();
		expect(fourthPlaceRaceTrack).toMatchSnapshot();
	});
});
