import PropTypes from 'prop-types';
import React from 'react';
import 'bootstrap/dist/css/bootstrap-grid.css'; // use bootstrap 4 grid system to support responsive design

import { carPropTypes } from '../../props';
import './CarsOverview.css';
import CarPreview from './CarPreview';
import LoadingView from '../loading/LoadingView';

export const CarsOverview = ({
	cars,
	error,
	loading,
	onCarSelectionChange
}) => {
	let component = null;

	if (error != null) {
		// show error to the user
		component = (
			<div className="col-md-12">
				<div className="cars-overview-grid__message">
					Failed to fetch cars, please try again later.
				</div>
			</div>
		);
	}
	// check if request is still loading
	else if (loading) {
		// add delay of 2 sec, if request last less then 2 sec
		// there is no point in showing spinner to the user
		component = (
			<div className="col-md-12">
				<LoadingView delay={2000} text="Loading data, please wait..." />
			</div>
		);
	} else {
		// show cars
		component =
			cars.length > 0 ? (
				cars.map(curCar => (
					<div
						className="col-md-4 col-sm-6 col-xs-12 cars-overview-grid__item"
						key={curCar.id}
					>
						<CarPreview
							{...curCar}
							onSelectionChanged={onCarSelectionChange} // callback is invoked every time selection on element changes
						/>
					</div>
				))
			) : (
				<div className="col-md-12">
					<div className=" cars-overview-grid__message">
						No cars found.
					</div>
				</div>
			);
	}

	return (
		<div className="container-fluid">
			<div className="row cars-overview-grid">{component}</div>
		</div>
	);
};

CarsOverview.propTypes = {
	cars: PropTypes.arrayOf(PropTypes.shape(carPropTypes)).isRequired,
	loading: PropTypes.bool,
	error: PropTypes.instanceOf(Error),
	onCarSelectionChange: PropTypes.func
};

CarsOverview.defaultProps = {
	loading: false,
	error: null,
	onCarSelectionChange: () => {}
};

export default CarsOverview;
