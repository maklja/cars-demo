import React from 'react';

import { carPropTypes, carPropDefaults } from '../../props';

import './CarPreview.css';

const CarPreview = ({ id, speed, name, image, description }) => {
	return (
		<div className="car-preview" data-id={id}>
			<div className="car-preview__card">
				<img src={image} alt={name} className="car-preview__image" />
			</div>
			<div className="car-preview__title">{name}</div>
		</div>
	);
};

CarPreview.propTypes = carPropTypes;

CarPreview.defaultProps = carPropDefaults;

export default CarPreview;
