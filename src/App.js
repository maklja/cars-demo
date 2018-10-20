import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import CarsOverview from './view/car/CarsOverview';
import { fetchCars } from './actions/fetchCars';
import './App.css';

export class App extends Component {
	render() {
		return (
			<div>
				<CarsOverview />
			</div>
		);
	}

	componentDidMount() {
		this.props.loadCars(); // fetch cars
	}
}

App.propTypes = {
	loadCars: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
	return {
		loadCars() {
			// send actions to fetch car
			dispatch(fetchCars());
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(App);
