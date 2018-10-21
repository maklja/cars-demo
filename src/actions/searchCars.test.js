import { SEARCH_CARS, searchCars } from './searchCars';

it('check if searchCars action returns correct type', () => {
	const searchCriteria = 'Test search';

	expect(searchCars(searchCriteria)).toEqual({
		type: SEARCH_CARS,
		searchCriteria
	});
});
