import {
	FETCH_CARS_REQUEST,
	FETCH_CARS_SUCCESS,
	FETCH_CARS_ERROR,
	requestCars,
	requestCarsSuccess,
	requestCarsFailed,
	fetchCars
} from './fetchCars';

describe('test car request actions', () => {
	it('check if requestCars action returns correct type', () => {
		expect(requestCars()).toEqual({
			type: FETCH_CARS_REQUEST
		});
	});

	it('check if requestCarsSuccess action returns correct type and value', () => {
		const cars = [
			{
				image: 'test',
				speed: 148,
				description: 'Test',
				name: 'Fiat Punto',
				id: 1
			}
		];

		expect(requestCarsSuccess(cars)).toEqual({
			type: FETCH_CARS_SUCCESS,
			cars
		});
	});

	it('check if requestCarsFailed action returns correct type and error', () => {
		const error = new Error('Test error');

		expect(requestCarsFailed(error)).toEqual({
			type: FETCH_CARS_ERROR,
			error
		});
	});
});

describe('test fetchCars request', () => {
	let fetchMock, dispatchMock;

	beforeEach(() => {
		fetchMock = jest.spyOn(window, 'fetch');
		dispatchMock = jest.fn();
	});

	afterEach(() => {
		fetchMock.mockRestore();
	});

	it('fetchCars successfully returns cars', async done => {
		const cars = [
			{
				image: 'test',
				speed: 148,
				description: 'Test',
				name: 'Fiat Punto',
				id: 1
			}
		];
		// mock fetch function
		fetchMock.mockImplementation(() =>
			// add mock implementation that will
			// represent fetch response
			Promise.resolve({
				json() {
					return {
						data: cars
					};
				}
			})
		);

		// async action that requires dispatch
		const fetchCarsAsync = fetchCars();

		await fetchCarsAsync(dispatchMock);

		// we expect 2 action to be triggered, one that request is started
		// and other one that request is complited successfully
		expect(dispatchMock.mock.calls.length).toBe(2);

		// get invoke arguments on dispatch functions
		const [
			requestCarsActionArgs,
			requestCarsSuccessActionArgs
		] = dispatchMock.mock.calls;

		// first call is invoked with requestCars action
		expect(requestCarsActionArgs[0]).toEqual(requestCars());
		// second call is invoked with requestCarsSuccess action
		expect(requestCarsSuccessActionArgs[0]).toEqual(
			requestCarsSuccess(cars)
		);

		done();
	});

	it('fetchCars fails and returns error', async done => {
		const error = new Error('Request error');
		fetchMock.mockImplementation(() =>
			// add mock implementation that will
			// represent fetch error
			Promise.reject(error)
		);

		// async action that requires dispatch
		const fetchCarsAsync = fetchCars();

		await fetchCarsAsync(dispatchMock);

		// we expect 2 action to be triggered, one that request is started
		// and other one that request is complited with error
		expect(dispatchMock.mock.calls.length).toBe(2);

		// get invoke arguments on dispatch functions
		const [
			requestCarsActionArgs,
			requestCarsFailedArgs
		] = dispatchMock.mock.calls;

		// first call is invoked with requestCars action
		expect(requestCarsActionArgs[0]).toEqual(requestCars());
		// second call is invoked with requestCarsFailed action
		expect(requestCarsFailedArgs[0]).toEqual(requestCarsFailed(error));

		done();
	});
});
