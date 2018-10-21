import {
	// import all action types
	FETCH_CARS_REQUEST,
	FETCH_CARS_SUCCESS,
	FETCH_CARS_ERROR
} from '../actions/fetchCars';

import { SEARCH_CARS } from '../actions/searchCars';
import { SELECT_CAR, DESELECT_CAR } from '../actions/selectCars';

export const initState = {
	items: [], // array will contain all cars from the server
	isFetching: false, // is request in progress
	error: null, // error if for some reason request fails
	searchCriteria: '', // car search criteria
	selectedItems: [] // selected car ids
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
		case SELECT_CAR:
			// if car is already selected, don't mutate state
			if (prevState.selectedItems.includes(action.id)) {
				return prevState;
			}

			return {
				...prevState,
				selectedItems: [...prevState.selectedItems, action.id]
			};
		case DESELECT_CAR:
			// if car is not selected just return and don't mutate state
			if (prevState.selectedItems.includes(action.id) === false) {
				return prevState;
			}

			return {
				...prevState,
				selectedItems: prevState.selectedItems.filter(
					curCarId => curCarId !== action.id // remove deselected id from array
				)
			};
		default:
			return prevState;
	}
};
