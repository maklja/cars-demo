import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { carPropTypes } from '../../props';

import './RaceTracks.css';

const medalColorsClasses = [
	'race-track__finish--first-place',
	'race-track__finish--second-place',
	'race-track__finish--third-place'
];

export const RaceTrack = ({ name, image, speed, isRaceStarted, place }) => {
	const placeNumber =
		// check range of car place and create view if needed
		0 <= place && place < medalColorsClasses.length ? (
			<div className="race-track__place-number">
				<div>{place + 1}</div>
			</div>
		) : null;

	return (
		<div
			className={`race-track ${
				isRaceStarted ? 'race-track--race-end' : ''
			}`}
			title={`Top speed: ${speed}`}
		>
			<div className="race-track__wrapper">
				<div
					className={`race-track__finish ${
						medalColorsClasses[place]
					}`}
				>
					<img className="race-track__image" src={image} alt={name} />
					{placeNumber}
				</div>
			</div>
			<div className="race-track__line" />
			<div className="race-track__finish-line" />
		</div>
	);
};

RaceTrack.propTypes = {
	...carPropTypes,
	isRaceStarted: PropTypes.bool,
	place: PropTypes.number // car place at the end of the race
};

RaceTrack.defaultProps = {
	isRaceStarted: false,
	place: -1
};

class RaceTracks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isRaceStarted: false,
			positions: []
		};

		this._startRace = this._startRace.bind(this);
		this._resetRace = this._resetRace.bind(this);
	}

	render() {
		const { cars } = this.props;
		const { isRaceStarted, positions } = this.state;

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
									place={positions.indexOf(curCar.id)}
									isRaceStarted={isRaceStarted}
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
								disabled={isRaceStarted === false}
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

	_startRace() {
		const { cars } = this.props;
		this.setState({
			isRaceStarted: true, // start the race
			// find out which car is fastest by speed
			positions: cars
				.concat() // don't mutate array
				.sort((carA, carB) => carB.speed - carA.speed) // sort cars by speed
				.map(curCar => curCar.id) // just take car id
		});
	}

	_resetRace() {
		// reset race
		this.setState({
			isRaceStarted: false,
			positions: []
		});
	}
}

RaceTracks.propTypes = {
	cars: PropTypes.arrayOf(PropTypes.shape(carPropTypes)).isRequired
};

export default RaceTracks;
