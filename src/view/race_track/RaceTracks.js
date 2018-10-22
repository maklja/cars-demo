import PropTypes from 'prop-types';
import React from 'react';

import { carPropTypes } from '../../props';

import './RaceTracks.css';

export const RaceTrack = ({ name, image }) => {
	return (
		<div className="race-track">
			<img className="race-track__image" src={image} alt={name} />
			<div className="race-track__line" />
			<div className="race-track__finish-line" />
		</div>
	);
};

RaceTrack.propTypes = {
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired
};

const RaceTracks = ({ cars }) => {
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
							<RaceTrack {...curCar} />
						</div>
					))
				) : (
					<div className="col-md-12">
						<div className="race-tracks-overview__message">
							Please select cars to start a race.
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

RaceTracks.propTypes = {
	cars: PropTypes.arrayOf(PropTypes.shape(carPropTypes)).isRequired
};

export default RaceTracks;
