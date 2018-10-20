import React from 'react';
import renderer from 'react-test-renderer';

import { CarsOverview } from './CarsOverview'; // import pure component without redux wrapper

it('CarsOverview renders correctly with Mazda 3 and Mercedes Benz CLA', () => {
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
		}
	];

	const tree = renderer.create(<CarsOverview cars={cars} />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('CarsOverview renders correctly with error message', () => {
	const error = new Error('Request error');

	const tree = renderer
		.create(<CarsOverview cars={[]} error={error} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('CarsOverview renders correctly with loading message', () => {
	jest.useFakeTimers(); // we need to trigger fake timer to show loading view

	const loading = true;
	const CarsOverviewInstance = renderer.create(
		<CarsOverview cars={[]} loading={loading} />
	);

	jest.runOnlyPendingTimers(); // loading is now visible

	const tree = CarsOverviewInstance.toJSON();
	expect(tree).toMatchSnapshot();
});