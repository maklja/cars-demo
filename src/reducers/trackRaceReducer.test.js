import trackRaceReducer, { initState } from './trackRaceReducer';
import {
	finishRace,
	startRace,
	resetRace,
	RESET_POSITION,
	START_POSITION,
	FINISH_POSITION
} from '../actions/trackRace';

it('check init state', () => {
	const nextState = trackRaceReducer(undefined, {
		type: 'TEST_ACTION'
	});

	expect(nextState).toEqual(initState);
});

it('check unknown action state', () => {
	const state = {
		state: RESET_POSITION
	};
	const nextState = trackRaceReducer(state, {
		type: 'UNKNOWN_ACTION'
	});

	expect(nextState).toBe(state);
});

it('check state after startRace action', () => {
	const state = {
		state: RESET_POSITION
	};
	const nextState = trackRaceReducer(state, startRace());
	expect(nextState).toEqual({
		state: START_POSITION
	});

	// reducer must be pure, so mutation is not allowed
	expect(state).toEqual({
		state: RESET_POSITION
	});
});

it('check state after resetRace action', () => {
	const state = {
		state: START_POSITION
	};
	const nextState = trackRaceReducer(state, resetRace());
	expect(nextState).toEqual({
		state: RESET_POSITION
	});

	// reducer must be pure, so mutation is not allowed
	expect(state).toEqual({
		state: START_POSITION
	});
});

it('check state after finishRace action', () => {
	const state = {
		state: START_POSITION
	};
	const nextState = trackRaceReducer(state, finishRace());
	expect(nextState).toEqual({
		state: FINISH_POSITION
	});

	// reducer must be pure, so mutation is not allowed
	expect(state).toEqual({
		state: START_POSITION
	});
});
