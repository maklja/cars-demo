import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { carPropTypes } from '../../props';
import { calculateTimeBySpeedAndDistance } from '../../utils';

import './RaceTrack.css';

const medalColorsClasses = [
	'race-track__car--first-place',
	'race-track__car--second-place',
	'race-track__car--third-place'
];

const RaceTrackPlace = ({ place }) => {
	return place !== -1 ? (
		<div className="race-track__place-number">
			<div>{place + 1}</div>
		</div>
	) : null;
};

RaceTrackPlace.propTypes = {
	place: PropTypes.number
};

RaceTrackPlace.defaultProps = {
	place: -1
};

export default class RaceTrack extends Component {
	constructor(props) {
		super(props);

		this._carRef = React.createRef();

		this._finishLineReached = this._finishLineReached.bind(this);
	}

	render() {
		const {
			name,
			image,
			speed,
			isRaceStarted,
			place,
			trackDistance
		} = this.props;

		const seconds = calculateTimeBySpeedAndDistance(speed, trackDistance);
		const transitionStyle = {
			// use move transition only when race starts
			// but when we do reset just immediately move
			// cars to the begin line
			transitionDuration: isRaceStarted ? `${seconds}s` : '0s'
		};
		return (
			<div
				className={`race-track ${
					isRaceStarted ? 'race-track--race-end' : ''
				}`}
				title={`Top speed: ${speed}`}
			>
				<div
					className="race-track__wrapper race-track__move"
					style={transitionStyle}
				>
					<div
						className={`race-track__car race-track__move ${this._getMedalColorsClass(
							place
						)}`}
						style={transitionStyle}
						ref={this._carRef}
					>
						<img
							className="race-track__image"
							src={image}
							alt={name}
						/>
						<RaceTrackPlace place={place} />
					</div>
				</div>
				<div className="race-track__line" />
				<div className="race-track__finish-line" />
			</div>
		);
	}

	_getMedalColorsClass(place) {
		if (place >= 0 && place < medalColorsClasses.length) {
			return medalColorsClasses[place];
		}

		return '';
	}

	componentDidMount() {
		// listen to transition end event, because thats the moment
		// when car reached finish line
		this._carRef.current.addEventListener(
			'transitionend',
			this._finishLineReached
		);
	}

	componentWillUnmount() {
		// on unmount remove listener to prevent memory leak
		// or unexpected callback triggers
		this._carRef.current.removeEventListener(
			'transitionend',
			this._finishLineReached
		);
	}

	_finishLineReached() {
		const { id, onFinishCallback } = this.props;

		onFinishCallback(id);
	}
}

RaceTrack.propTypes = {
	...carPropTypes,
	isRaceStarted: PropTypes.bool,
	place: PropTypes.number, // car place at the end of the race
	onFinishCallback: PropTypes.func, // callback will be invoked after car reaches end
	trackDistance: PropTypes.number.isRequired
};

RaceTrack.defaultProps = {
	isRaceStarted: false,
	place: -1,
	onFinishCallback: () => {}
};
