export const SEARCH_CARS = 'SEARCH_CARS';

export const searchCars = searchCriteria => {
	return {
		type: SEARCH_CARS,
		searchCriteria
	};
};
