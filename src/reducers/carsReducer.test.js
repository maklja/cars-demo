import carsReducer from './carsReducer';
import {
	requestCars,
	requestCarsSuccess,
	requestCarsFailed
} from '../actions/fetchCars';

import { searchCars } from '../actions/searchCars';

it('check init state', () => {
	const nextState = carsReducer(undefined, {
		type: 'TEST_ACTION'
	});

	expect(nextState).toEqual({
		items: [],
		isFetching: false,
		error: null,
		searchCriteria: ''
	});
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
