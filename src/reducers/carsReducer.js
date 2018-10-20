import {
	// import all action types
	FETCH_CARS_REQUEST,
	FETCH_CARS_SUCCESS,
	FETCH_CARS_ERROR
} from '../actions/fetchCars';

const initState = {
	items: [], // array will contain all cars from the server
	isFetching: false, // is request in progress
	error: null // error if for some reason request fails
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
		default:
			return prevState;
	}
};
