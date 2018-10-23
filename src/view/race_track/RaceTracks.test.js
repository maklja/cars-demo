import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme'; // use enzyme to simulate user interaction
import Adapter from 'enzyme-adapter-react-16';

import { RaceTracks } from './RaceTracks';

// configure enzyme for react 16
configure({ adapter: new Adapter() });

describe('RaceTracks test', () => {
	// test data
	const mockCarsData = [
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

	it('RaceTracks renders correctly with no cars on track', () => {
		const cars = [];
		const trackDistance = 0;

		const tree = renderer
			.create(<RaceTracks cars={cars} trackDistance={trackDistance} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('RaceTracks renders correctly with three cars on track', () => {
		const trackDistance = 0;
		const tree = renderer
			.create(
				<RaceTracks
					cars={mockCarsData}
					trackDistance={trackDistance}
				/>,
				{ createNodeMock }
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('check race result after start button is clicked', () => {
		// well because jsdom doesn't support transition
		// we need to manually invoke callback each time
		// car reaches finish line and then check if parent
		// marks all cars in proper way
		const cars = [
			...mockCarsData,
			{
				description: 'Yugo',
				id: 11,
				image:
					'https://lb.assets.fiat.com/assets/00/punto-my16/images/thumbnail/equipment/street.png',
				name: 'Yugo',
				speed: 99
			}
		];

		const wrapper = mount(<RaceTracks cars={cars} trackDistance={0} />); // use mount, and not shallow, to also render all child components

		// find and click on start button in order to start race
		wrapper.find('[name="start-race"]').simulate('click');

		const raceTracks = wrapper.find('RaceTrack'); // get all RaceTrack children
		// get all props arguments from child components
		const raceTracksProps = raceTracks.map(curRaceTrack =>
			curRaceTrack.props()
		);

		// sort cars from fastest to slowest one
		// then extract car id and onFinishCallback
		const raceTracksBySpeed = raceTracksProps
			.sort(
				(raceTrackA, raceTrackB) => raceTrackB.speed - raceTrackA.speed
			) // sort race tracks by speed of cars on them
			.map(curRaceTrack => {
				// in order to fake child component callback
				// we need car id nad onFinishCallback that is called
				// after car reaches finish line
				const { id, onFinishCallback } = curRaceTrack;
				return {
					id,
					onFinishCallback
				};
			});

		// now fake that car has reached finishing line
		// by invoking onFinishCallback
		raceTracksBySpeed.forEach(curRaceTrack => {
			const { id, onFinishCallback } = curRaceTrack;
			onFinishCallback(id);
		});

		// after race is over get positions that are sorted from fastest
		// to slowest car
		const placesAtRaceEnd = wrapper.state().positions;

		expect(placesAtRaceEnd).toEqual([
			3, // Mercedes Benz CLA has the first place
			2, // Mazda 3 has the second place
			1, // Fiat Punto has third place
			11 // Yugo has fourth place
		]);

		wrapper.update(); // update view with new state for snapshot
		// in snapshot test we will now see that prop place has correct value on each child
		// that each child has class race-track--race-end
		// child with data Mercedes Benz CLA has class race-track__car--first-place
		// child with data Mazda 3 has class race-track__car--second-place
		// child with data Fiat Punto has class race-track__car--third-place
		// child with data Yugo doesn't have any additional class, because he reached finish line last
		expect(wrapper).toMatchSnapshot();
	});
});
