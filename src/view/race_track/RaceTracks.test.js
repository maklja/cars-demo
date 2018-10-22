import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme'; // use enzyme to simulate user interaction
import Adapter from 'enzyme-adapter-react-16';

import RaceTracks, { RaceTrack } from './RaceTracks';

// configure enzyme for react 16
configure({ adapter: new Adapter() });

describe('RaceTracks test', () => {
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

	it('check race result after start button is clicked', () => {
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
			},
			{
				description: 'Yugo',
				id: 11,
				image:
					'https://lb.assets.fiat.com/assets/00/punto-my16/images/thumbnail/equipment/street.png',
				name: 'Yugo',
				speed: 99
			}
		];

		const wrapper = shallow(<RaceTracks cars={cars} />);

		// find and click on start button
		wrapper.find('[name="start-race"]').simulate('click');

		// after race is over get positions that are sorted from fastest
		// to slowest car
		const placesAtRaceEnd = wrapper.state().positions;

		expect(placesAtRaceEnd).toEqual([
			3, // Mercedes Benz CLA has the first place
			2, // Mazda 3 has the second place
			1, // Fiat Punto has third place
			11 // Yugo has fourth place
		]);
	});
});

describe('RaceTrack tests', () => {
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

	it('RaceTrack renders correctly with gold, silver, bronze place and fourth place', () => {
		const car = {
			image:
				'https://www.mazdausa.com/siteassets/vehicles/2017/m3s/trims/sport/17-m3s-sp-25d-snowflake-white.png',
			speed: 235,
			description:
				'The Fiat Punto is a supermini car produced by the Italian manufacturer Fiat since 1993.',
			name: 'Mazda 3',
			id: 2
		};

		const firstPlace = 0; // gold place
		const firstPlaceRaceTrack = renderer
			.create(<RaceTrack {...car} place={firstPlace} />)
			.toJSON();
		expect(firstPlaceRaceTrack).toMatchSnapshot();

		const secondPlace = 1; // silver place
		const secondPlaceRaceTrack = renderer
			.create(<RaceTrack {...car} place={secondPlace} />)
			.toJSON();
		expect(secondPlaceRaceTrack).toMatchSnapshot();

		const thirdPlace = 2; // bronze place
		const thirdPlaceRaceTrack = renderer
			.create(<RaceTrack {...car} place={thirdPlace} />)
			.toJSON();
		expect(thirdPlaceRaceTrack).toMatchSnapshot();

		const fourthPlace = 4; // no reward place
		const fourthPlaceRaceTrack = renderer
			.create(<RaceTrack {...car} place={fourthPlace} />)
			.toJSON();
		expect(fourthPlaceRaceTrack).toMatchSnapshot();
	});
});
