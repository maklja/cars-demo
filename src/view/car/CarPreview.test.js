import React from 'react';
import renderer from 'react-test-renderer';

import CarPreview from './CarPreview';

it('CarPreview renders correctly with Mazda 3', () => {
	const car = {
		image:
			'https://www.mazdausa.com/siteassets/vehicles/2017/m3s/trims/sport/17-m3s-sp-25d-snowflake-white.png',
		speed: 235,
		description:
			'The Fiat Punto is a supermini car produced by the Italian manufacturer Fiat since 1993.',
		name: 'Mazda 3',
		id: 2
	};

	const tree = renderer.create(<CarPreview {...car} />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('CarPreview renders correctly with Mercedes Benz CLA', () => {
	const car = {
		image: 'http://www.nriol.com/images/benz-cla.png',
		speed: 280,
		description:
			'The Fiat Punto is a supermini car produced by the Italian manufacturer Fiat since 1993.',
		name: 'Mercedes Benz CLA',
		id: 3
	};

	const tree = renderer.create(<CarPreview {...car} />).toJSON();
	expect(tree).toMatchSnapshot();
});
