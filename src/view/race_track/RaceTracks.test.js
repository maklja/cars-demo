import React from 'react';
import renderer from 'react-test-renderer';

import RaceTracks, { RaceTrack } from './RaceTracks';

it('RaceTracks renders correctly with no cars on track', () => {
	const cars = [];

	const tree = renderer.create(<RaceTracks cars={cars} />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('RaceTracks renders correctly with three cars on track', () => {
	const cars = [
		{
			image:
				'https://www.mazdausa.com/siteassets/vehicles/2017/m3s/trims/sport/17-m3s-sp-25d-snowflake-white.png',
			speed: 235,
			description:
				'The Fiat Punto is a supermini car produced by the Italian manufacturer Fiat since 1993.',
			name: 'Mazda 3',
			id: 2
		},
		{
			image: 'http://www.nriol.com/images/benz-cla.png',
			speed: 280,
			description:
				'The Fiat Punto is a supermini car produced by the Italian manufacturer Fiat since 1993.',
			name: 'Mercedes Benz CLA',
			id: 3
		},
		{
			description:
				'The Fiat Punto is a supermini car produced by the Italian manufacturer Fiat since 1993.',
			id: 1,
			image:
				'https://lb.assets.fiat.com/assets/00/punto-my16/images/thumbnail/equipment/street.png',
			name: 'Fiat Punto',
			speed: 148
		}
	];

	const tree = renderer.create(<RaceTracks cars={cars} />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('RaceTrack renders correctly with Mazda 3 car data', () => {
	const car = {
		image:
			'https://www.mazdausa.com/siteassets/vehicles/2017/m3s/trims/sport/17-m3s-sp-25d-snowflake-white.png',
		speed: 235,
		description:
			'The Fiat Punto is a supermini car produced by the Italian manufacturer Fiat since 1993.',
		name: 'Mazda 3',
		id: 2
	};

	const tree = renderer.create(<RaceTrack {...car} />).toJSON();
	expect(tree).toMatchSnapshot();
});
