import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { carPropTypes } from '../../props';
import RaceTrack from './RaceTrack';
import {
	startRace,
	resetRace,
	finishRace,
	START_POSITION,
	FINISH_POSITION
} from '../../actions/trackRace';

import './RaceTracks.css';

export class RaceTracks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			positions: []
		};

		this._startRace = this._startRace.bind(this);
		this._resetRace = this._resetRace.bind(this);
		this._onCarReachedFinishLine = this._onCarReachedFinishLine.bind(this);
	}

	render() {
		const { cars, trackDistance, isRaceStarted } = this.props;
		const { positions } = this.state;

		return (
			<div className="container-fluid race-tracks-overview">
				<div className="row">
					<div className="col-md-12">
						<div className="race-tracks-overview__title">
							Race tracks
						</div>
					</div>
					{cars.length > 0 ? (
						cars.map(curCar => (
							<div className="col-md-12" key={curCar.id}>
								<RaceTrack
									{...curCar}
									trackDistance={trackDistance}
									place={positions.indexOf(curCar.id)}
									isRaceStarted={isRaceStarted}
									onFinishCallback={
										this._onCarReachedFinishLine // callback will be invoked after transition end i trigger
									}
								/>
							</div>
						))
					) : (
						<div className="col-md-12">
							<div className="race-tracks-overview__message">
								Please select cars to start a race.
							</div>
						</div>
					)}
					<div className="col-md-12">
						<div className="race-tracks-overview__button">
							<button
								name="start-race"
								onClick={this._startRace}
								disabled={cars.length === 0 || isRaceStarted}
								className="button-control button-control--large"
							>
								Start
							</button>

							<button
								name="reset-race"
								onClick={this._resetRace}
								disabled={
									cars.length === 0 || isRaceStarted === false
								}
								className="button-control button-control--large"
							>
								Reset
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	_onCarReachedFinishLine(id) {
		this.setState(
			state => {
				return {
					// update race positions with new id
					positions: [...state.positions, id]
				};
			},
			() => {
				const { positions } = this.state;
				const { cars, finishRace } = this.props;

				// wait all cars to reach finish line
				if (positions.length === cars.length) {
					finishRace(); // fire action that all cars are on the finish line and that race is over
				}
			}
		);
	}

	_startRace() {
		this.props.startRace();
	}

	_resetRace() {
		this.props.resetRace();
		// reset race
		this.setState({
			positions: []
		});
	}
}

RaceTracks.propTypes = {
	cars: PropTypes.arrayOf(PropTypes.shape(carPropTypes)).isRequired,
	trackDistance: PropTypes.number.isRequired,
	isRaceStarted: PropTypes.bool,
	startRace: PropTypes.func,
	resetRace: PropTypes.func,
	finishRace: PropTypes.func
};

RaceTracks.defaultProps = {
	isRaceStarted: false,
	startRace: () => {},
	resetRace: () => {},
	finishRace: () => {}
};

const mapStateToProps = state => {
	// get cars object from redux store
	const { traceRace } = state;
	const { state: raceState } = traceRace;
	return {
		isRaceStarted:
			raceState === START_POSITION || raceState === FINISH_POSITION
	};
};

const mapDispatchToProps = dispatch => {
	return {
		// start race action
		startRace() {
			dispatch(startRace());
		},
		// reset race action
		resetRace() {
			dispatch(resetRace());
		},
		// finish race action
		finishRace() {
			dispatch(finishRace());
		}
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RaceTracks);
