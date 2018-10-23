import {
	RESET_RACE,
	START_RACE,
	FINISH_RACE,
	resetRace,
	startRace,
	finishRace
} from './trackRace';

it('check if resetRace action returns correct type', () => {
	expect(resetRace()).toEqual({
		type: RESET_RACE
	});
});

it('check if startRace action returns correct type', () => {
	expect(startRace()).toEqual({
		type: START_RACE
	});
});

it('check if finishRace action returns correct type', () => {
	expect(finishRace()).toEqual({
		type: FINISH_RACE
	});
});
