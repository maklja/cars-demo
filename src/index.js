import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// import polyfills for IE
import 'whatwg-fetch';
import 'core-js/es6/promise';

import './index.css';
import App from './App';

import rootReducer from './reducers/rootReducer';

// create redux store and add thunk middleware to support async actions
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
