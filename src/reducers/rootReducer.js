import { combineReducers } from 'redux';

import carsReducer from './carsReducer';

// application root reducer
const rootReducer = combineReducers({
	// add cars object in store that will hold all informations about cars
	cars: carsReducer
});

export default rootReducer;
