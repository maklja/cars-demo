import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap-grid.css';

import { carPropTypes } from '../../props';
import SearchInput from '../search/SearchInput';
import CarsOverview from './CarsOverview';
import RaceTracks from '../race_track/RaceTracks';
import { fetchCars } from '../../actions/fetchCars';
import { searchCars } from '../../actions/searchCars';
import { selectCar, deselectCar } from '../../actions/selectCars';
import { START_POSITION } from '../../actions/trackRace';
import conf from '../../conf';

class CarsPage extends Component {
	constructor(props) {
		super(props);

		this._onSearch = this._onSearch.bind(this);
		this._onCarSelectionChange = this._onCarSelectionChange.bind(this);
	}

	render() {
		const {
			cars,
			loading,
			error,
			selectedCars,
			searchCriteria,
			disableSelection
		} = this.props;
		return (
			<div>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<SearchInput
								placeholder="Search..."
								onSearchCallback={this._onSearch}
							/>
						</div>
					</div>
				</div>
				<div>
					<CarsOverview
						disableSelection={disableSelection}
						cars={
							searchCriteria.length > 0
								? cars.filter(curCar =>
										curCar.name
											.toLowerCase()
											.includes(searchCriteria)
								  )
								: cars
						}
						loading={loading}
						error={error}
						selectedCars={selectedCars}
						onCarSelectionChange={this._onCarSelectionChange}
					/>
				</div>
				<div>
					<RaceTracks
						trackDistance={conf.traceTrackDistance}
						cars={cars
							// filter only selected cars
							.filter(curCar => selectedCars.includes(curCar.id))
							// sort by selection order
							.sort((carA, carB) => {
								return (
									selectedCars.indexOf(carA.id) -
									selectedCars.indexOf(carB.id)
								);
							})}
					/>
				</div>
			</div>
		);
	}

	_onSearch(searchCriteria) {
		this.props.searchCars(searchCriteria);
	}

	_onCarSelectionChange(id, isSelected) {
		const { selectCar, deselectCar } = this.props;
		if (isSelected) {
			selectCar(id);
		} else {
			deselectCar(id);
		}
	}

	componentDidMount() {
		this.props.loadCars(); // fetch cars
	}
}

CarsPage.propTypes = {
	loadCars: PropTypes.func.isRequired,
	searchCars: PropTypes.func.isRequired,
	cars: PropTypes.arrayOf(PropTypes.shape(carPropTypes)).isRequired,
	loading: PropTypes.bool,
	error: PropTypes.instanceOf(Error),
	selectCar: PropTypes.func,
	deselectCar: PropTypes.func,
	selectedCars: PropTypes.arrayOf(PropTypes.number),
	searchCriteria: PropTypes.string,
	disableSelection: PropTypes.bool
};

CarsPage.defaultProps = {
	loading: false,
	error: null,
	selectCar: () => {},
	deselectCar: () => {},
	selectedCars: [],
	searchCriteria: '',
	disableSelection: false
};

const mapStateToProps = state => {
	// get cars object from redux store
	const { cars, traceRace } = state;
	const { searchCriteria, items, isFetching, error, selectedItems } = cars;
	const { state: raceState } = traceRace;

	return {
		cars: items,
		searchCriteria,
		loading: isFetching,
		error: error,
		selectedCars: selectedItems,
		disableSelection: raceState === START_POSITION // if race is in progress disable selection
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loadCars() {
			// send actions to fetch car
			dispatch(fetchCars());
		},
		searchCars(searchCriteria) {
			dispatch(searchCars(searchCriteria));
		},
		selectCar(carId) {
			dispatch(selectCar(carId));
		},
		deselectCar(carId) {
			dispatch(deselectCar(carId));
		}
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CarsPage);
