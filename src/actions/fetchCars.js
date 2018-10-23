import conf from '../conf';

export const FETCH_CARS_REQUEST = 'FETCH_CARS_REQUEST';
export const FETCH_CARS_SUCCESS = 'FETCH_CARS_SUCCESS';
export const FETCH_CARS_ERROR = 'FETCH_CARS_ERROR';

export const requestCars = () => {
	return { type: FETCH_CARS_REQUEST };
};

export const requestCarsSuccess = cars => {
	return { type: FETCH_CARS_SUCCESS, cars };
};

export const requestCarsFailed = error => {
	return { type: FETCH_CARS_ERROR, error };
};

export const fetchCars = () => {
	return async dispatch => {
		try {
			dispatch(requestCars());

			const response = await fetch(conf.fetchCarsUrl, {
				method: 'GET'
			});
			const carData = await response.json();

			dispatch(requestCarsSuccess(carData.data)); // comment this line to view loading spinner
		} catch (err) {
			dispatch(requestCarsFailed(err));
		}
	};
};
