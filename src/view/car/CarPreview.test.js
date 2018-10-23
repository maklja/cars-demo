import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme'; // use enzyme to simulate user interaction
import Adapter from 'enzyme-adapter-react-16';

import CarPreview from './CarPreview';

// configure enzyme for react 16
configure({ adapter: new Adapter() });

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

it('CarPreview renders correctly when selected', () => {
	const car = {
		image: 'http://www.nriol.com/images/benz-cla.png',
		speed: 280,
		description:
			'The Fiat Punto is a supermini car produced by the Italian manufacturer Fiat since 1993.',
		name: 'Mercedes Benz CLA',
		id: 3
	};

	const tree = renderer
		.create(<CarPreview {...car} isSelected={true} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('test selection change callback on initially unselected component', done => {
	const car = {
		image: 'http://www.nriol.com/images/benz-cla.png',
		speed: 280,
		description:
			'The Fiat Punto is a supermini car produced by the Italian manufacturer Fiat since 1993.',
		name: 'Mercedes Benz CLA',
		id: 3
	};

	// create shallow copy with enzyme
	const wrapper = shallow(
		<CarPreview
			{...car}
			onSelectionChanged={(id, isSelected) => {
				// callback is called every time selection is change
				expect(id).toBe(car.id); // first parameter must be car id
				expect(isSelected).toBeTruthy(); // second parameter must be selection flag
				done();
			}}
		/>
	);

	// simulate click on control
	wrapper.simulate('click');
});

it('test selection change callback on initially selected component', done => {
	const car = {
		image: 'http://www.nriol.com/images/benz-cla.png',
		speed: 280,
		description:
			'The Fiat Punto is a supermini car produced by the Italian manufacturer Fiat since 1993.',
		name: 'Mercedes Benz CLA',
		id: 3
	};

	// create shallow copy with enzyme
	const wrapper = shallow(
		<CarPreview
			{...car}
			isSelected={true}
			onSelectionChanged={(id, isSelected) => {
				// callback is called every time selection is change
				expect(id).toBe(car.id); // first parameter must be car id
				expect(isSelected).toBeFalsy(); // second parameter must be selection flag
				done();
			}}
		/>
	);

	// simulate click on control
	wrapper.simulate('click');
});
