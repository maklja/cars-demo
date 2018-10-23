import PropTypes from 'prop-types';
import React from 'react';
import 'bootstrap/dist/css/bootstrap-grid.css'; // use bootstrap 4 grid system to support responsive design

import { carPropTypes } from '../../props';
import './CarsOverview.css';
import CarPreview from './CarPreview';

export const CarsOverview = ({
	cars,
	onCarSelectionChange,
	selectedCars,
	disableSelection
}) => {
	// show cars
	const component =
		cars.length > 0 ? (
			cars.map(curCar => (
				<div
					className="col-md-4 col-sm-6 col-xs-12 cars-overview-grid__item"
					key={curCar.id}
				>
					<CarPreview
						{...curCar}
						isSelected={selectedCars.includes(curCar.id)} // check if car is selected
						onSelectionChanged={onCarSelectionChange} // callback is invoked every time selection on element changes
						disableSelection={disableSelection}
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
	onCarSelectionChange: PropTypes.func,
	selectedCars: PropTypes.arrayOf(PropTypes.number),
	disableSelection: PropTypes.bool
};

CarsOverview.defaultProps = {
	loading: false,
	error: null,
	onCarSelectionChange: () => {},
	selectedCars: [],
	disableSelection: false
};

export default CarsOverview;
