import { combineReducers } from 'redux';

import carsReducer from './carsReducer';
import trackRaceReducer from './trackRaceReducer';

// application root reducer
const rootReducer = combineReducers({
	// add cars object in store that will hold all information about cars
	cars: carsReducer,
	// trackRace holds all information about race in progress
	traceRace: trackRaceReducer
});

export default rootReducer;
