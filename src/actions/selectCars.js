export const SELECT_CAR = 'SELECT_CAR';
export const DESELECT_CAR = 'DESELECT_CAR';

export const selectCar = carId => {
	return {
		type: SELECT_CAR,
		id: carId
	};
};

export const deselectCar = carId => {
	return {
		type: DESELECT_CAR,
		id: carId
	};
};
