import carsReducer, { initState } from './carsReducer';
import {
	requestCars,
	requestCarsSuccess,
	requestCarsFailed
} from '../actions/fetchCars';

import { searchCars } from '../actions/searchCars';
import { selectCar, deselectCar } from '../actions/selectCars';

it('check init state', () => {
	const nextState = carsReducer(undefined, {
		type: 'TEST_ACTION'
	});

	expect(nextState).toEqual(initState);
});

it('check unknown action state', () => {
	const state = {
		items: [],
		isFetching: true,
		error: null
	};
	const nextState = carsReducer(state, {
		type: 'UNKNOWN_ACTION'
	});

	expect(nextState).toBe(state);
});

it('check state after requestCars action', () => {
	const state = {
		items: [],
		isFetching: false,
		error: null
	};
	const nextState = carsReducer(state, requestCars());

	expect(nextState).toEqual({
		items: [],
		isFetching: true,
		error: null
	});

	// reducer must be pure, so mutation is not allowed
	expect(state).toEqual({
		items: [],
		isFetching: false,
		error: null
	});
});

it('check state after requestCarsSuccess action', () => {
	const cars = [
		{
			image: 'test',
			speed: 148,
			description: 'Test',
			name: 'Fiat Punto',
			id: 1
		}
	];
	const state = {
		items: [],
		isFetching: false,
		error: null
	};
	const nextState = carsReducer(state, requestCarsSuccess(cars));

	expect(nextState).toEqual({
		items: cars,
		isFetching: false,
		error: null
	});

	// reducer must be pure, so mutation is not allowed
	expect(state).toEqual({
		items: [],
		isFetching: false,
		error: null
	});
});

it('check state after requestCarsFailed action', () => {
	const error = new Error('Request error');
	const state = {
		items: [],
		isFetching: false,
		error: null
	};
	const nextState = carsReducer(state, requestCarsFailed(error));

	expect(nextState).toEqual({
		items: [],
		isFetching: false,
		error
	});

	// reducer must be pure, so mutation is not allowed
	expect(state).toEqual({
		items: [],
		isFetching: false,
		error: null
	});
});

it('check state after searchCars action', () => {
	const searchString = 'test string';
	const state = {
		items: [],
		isFetching: false,
		error: null,
		searchCriteria: ''
	};
	const nextState = carsReducer(state, searchCars(searchString));

	expect(nextState).toEqual({
		items: [],
		isFetching: false,
		error: null,
		searchCriteria: 'test string'
	});

	// reducer must be pure, so mutation is not allowed
	expect(state).toEqual({
		items: [],
		isFetching: false,
		error: null,
		searchCriteria: ''
	});
});

it('check state after selectCar action', () => {
	const carId = 1;
	const state = {
		selectedItems: []
	};
	const nextState = carsReducer(state, selectCar(carId));

	expect(nextState).toEqual({
		selectedItems: [carId]
	});

	// reducer must be pure, so mutation is not allowed
	expect(state).toEqual({
		selectedItems: []
	});
});

it('check state after selecting already selected car', () => {
	const carId = 1;
	const state = {
		selectedItems: []
	};
	const selectedCarState = carsReducer(state, selectCar(carId));
	const sameState = carsReducer(selectedCarState, selectCar(carId));

	expect(sameState).toBe(selectedCarState);

	// reducer must be pure, so mutation is not allowed
	expect(state).toEqual({
		selectedItems: []
	});
});

it('check state after deselectCar action', () => {
	const carId = 1;
	const state = {
		selectedItems: []
	};
	// first select car
	const selectedCarState = carsReducer(state, selectCar(carId));
	// then deselect car
	const deselectedCarState = carsReducer(
		selectedCarState,
		deselectCar(carId)
	);

	expect(deselectedCarState).toEqual({
		selectedItems: []
	});

	// reducer must be pure, so mutation is not allowed
	expect(state).toEqual({
		selectedItems: []
	});
});

it('check state after trying to deselecting car that is not selected', () => {
	const carId = 1;
	const unknownCarId = 2;
	const state = {
		selectedItems: []
	};
	const selectedCarState = carsReducer(state, selectCar(carId));
	const sameState = carsReducer(selectedCarState, deselectCar(unknownCarId));

	expect(sameState).toBe(selectedCarState);

	// reducer must be pure, so mutation is not allowed
	expect(state).toEqual({
		selectedItems: []
	});
});
