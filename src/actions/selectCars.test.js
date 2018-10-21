import { SELECT_CAR, DESELECT_CAR, selectCar, deselectCar } from './selectCars';

it('check if selectCar action returns correct type', () => {
	const carId = 1;

	expect(selectCar(carId)).toEqual({
		type: SELECT_CAR,
		id: carId
	});
});

it('check if deselectCar action returns correct type', () => {
	const carId = 1;

	expect(deselectCar(carId)).toEqual({
		type: DESELECT_CAR,
		id: carId
	});
});
