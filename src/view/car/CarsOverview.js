import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { carPropTypes } from '../../props';

export const CarsOverview = ({ cars, error }) => {
	// for the first task just fetch cars and show them
	// on the view
	return (
		<div>
			{error == null
				? cars.map(curCar => <div key={curCar.id}>{curCar.name}</div>)
				: 'Failed to fetch cars, please try again later.'}
		</div>
	);
};

CarsOverview.propTypes = {
	cars: PropTypes.arrayOf(carPropTypes).isRequired,
	loading: PropTypes.bool,
	error: PropTypes.instanceOf(Error)
};

CarsOverview.defaultProps = {
	loading: false,
	error: null
};

const mapStateToProps = state => {
	// get cars object from redux store
	const { cars } = state;

	return {
		cars: cars.items,
		loading: cars.isFetching,
		error: cars.error
	};
};

export default connect(mapStateToProps)(CarsOverview);
