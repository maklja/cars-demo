import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// import polyfills for IE
import 'whatwg-fetch';
import 'core-js/es6/promise';
import 'core-js/es6/object';
import 'core-js/es6/string';
import 'core-js/modules/es7.array.includes';

import './index.css';
import App from './App';

import rootReducer from './reducers/rootReducer';

// include redux chrome extension in developer mode for easy
// redux store preview
const composeEnhancers =
	process.env.NODE_ENV !== 'production'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
		: compose;

// create redux store and add thunk middleware to support async actions
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
