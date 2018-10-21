import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap-grid.css';

import { carPropTypes } from '../../props';
import Searchinput from '../search/SearchInput';
import CarsOverview from './CarsOverview';
import { fetchCars } from '../../actions/fetchCars';
import { searchCars } from '../../actions/searchCars';
import { selectCar, deselectCar } from '../../actions/selectCars';

class CarsPage extends Component {
	constructor(props) {
		super(props);

		this._onSearch = this._onSearch.bind(this);
		this._onCarSelectionChange = this._onCarSelectionChange.bind(this);
	}

	render() {
		const { cars, loading, error } = this.props;
		return (
			<div>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<Searchinput
								placeholder="Search..."
								onSearchCallback={this._onSearch}
							/>
						</div>
					</div>
				</div>
				<div>
					<CarsOverview
						cars={cars}
						loading={loading}
						error={error}
						onCarSelectionChange={this._onCarSelectionChange}
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
	deselectCar: PropTypes.func
};

CarsPage.defaultProps = {
	loading: false,
	error: null,
	selectCar: () => {},
	deselectCar: () => {}
};

const mapStateToProps = (state, aa) => {
	// get cars object from redux store
	const { cars } = state;
	const { searchCriteria, items, isFetching, error } = cars;
	return {
		cars:
			searchCriteria.length > 0
				? items.filter(curCar =>
						curCar.name.toLowerCase().includes(searchCriteria)
				  )
				: items,
		loading: isFetching,
		error: error
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
