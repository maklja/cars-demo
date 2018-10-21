import {
	// import all action types
	FETCH_CARS_REQUEST,
	FETCH_CARS_SUCCESS,
	FETCH_CARS_ERROR
} from '../actions/fetchCars';

import { SEARCH_CARS } from '../actions/searchCars';

const initState = {
	items: [], // array will contain all cars from the server
	isFetching: false, // is request in progress
	error: null, // error if for some reason request fails
	searchCriteria: '' // car search criteria
};

export default (prevState = initState, action) => {
	switch (action.type) {
		case FETCH_CARS_REQUEST:
			return {
				...prevState,
				isFetching: true,
				items: [],
				error: null
			};
		case FETCH_CARS_SUCCESS:
			return {
				...prevState,
				isFetching: false,
				items: [...action.cars],
				error: null
			};
		case FETCH_CARS_ERROR:
			return {
				...prevState,
				isFetching: false,
				items: [],
				error: action.error
			};
		case SEARCH_CARS:
			return {
				...prevState,
				searchCriteria: action.searchCriteria
					.toLowerCase()
					.replace(/\s+/g, ' ') // remove extra spaces in string
					.trim() // remove spaces at the begin and end of string
			};
		default:
			return prevState;
	}
};
