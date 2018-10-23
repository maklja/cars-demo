export const RESET_RACE = 'RESET_RACE';
export const START_RACE = 'START_RACE';
export const FINISH_RACE = 'FINISH_RACE';

export const RESET_POSITION = 0; // cars are on start line
export const START_POSITION = 1; // cars are moving to the finish line
export const FINISH_POSITION = 2; // all cars are at the finish line

export const resetRace = () => {
	return { type: RESET_RACE };
};

export const startRace = () => {
	return { type: START_RACE };
};

export const finishRace = () => {
	return { type: FINISH_RACE };
};
