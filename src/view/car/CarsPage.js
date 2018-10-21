import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap-grid.css';

import Searchinput from '../search/SearchInput';
import CarsOverview from './CarsOverview';
import { fetchCars } from '../../actions/fetchCars';
import { searchCars } from '../../actions/searchCars';

class CarsPage extends Component {
	constructor(props) {
		super(props);

		this._onSearch = this._onSearch.bind(this);
	}

	render() {
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
					<CarsOverview />
				</div>
			</div>
		);
	}

	_onSearch(searchCriteria) {
		this.props.searchCars(searchCriteria);
	}

	componentDidMount() {
		this.props.loadCars(); // fetch cars
	}
}

CarsPage.propTypes = {
	loadCars: PropTypes.func.isRequired,
	searchCars: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
	return {
		loadCars() {
			// send actions to fetch car
			dispatch(fetchCars());
		},
		searchCars(searchCriteria) {
			dispatch(searchCars(searchCriteria));
		}
	};
};
export default connect(
	null,
	mapDispatchToProps
)(CarsPage);
