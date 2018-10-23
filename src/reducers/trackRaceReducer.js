import {
	START_RACE,
	RESET_RACE,
	FINISH_RACE,
	RESET_POSITION,
	START_POSITION,
	FINISH_POSITION
} from '../actions/trackRace';

export const initState = {
	state: RESET_RACE
};

export default (prevState = initState, action) => {
	switch (action.type) {
		case START_RACE:
			return {
				...prevState,
				state: START_POSITION
			};
		case RESET_RACE:
			return {
				...prevState,
				state: RESET_POSITION
			};
		case FINISH_RACE:
			return {
				...prevState,
				state: FINISH_POSITION
			};
		default:
			return prevState;
	}
};
