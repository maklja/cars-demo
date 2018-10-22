import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { carPropTypes, carPropDefaults } from '../../props';

import './CarPreview.css';

class CarPreview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isSelected: props.isSelected
		};

		this._onClick = this._onClick.bind(this);
	}

	render() {
		const { id, speed, name, image, description } = this.props;
		const { isSelected } = this.state;

		return (
			<div
				className={`car-preview ${
					isSelected ? 'car-preview--selected' : '' // is selected put border around tile
				}`}
				data-id={id}
				onClick={this._onClick}
			>
				<div className="car-preview__card">
					<div className="car-preview__front">
						<img
							src={image}
							alt={name}
							className="car-preview__image"
						/>
					</div>
					<div className="car-preview__back">
						<div className="car-preview__overlay" />
						<div className="car-preview__description">
							<div className="car-preview__description-text">
								{description}
							</div>
							<div>
								Top speed: {speed}
								km/h
							</div>
						</div>
						<img
							src={image}
							alt={name}
							className="car-preview__image"
						/>
					</div>
				</div>
				<div className="car-preview__title">{name}</div>
			</div>
		);
	}

	_onClick() {
		const { id, onSelectionChanged } = this.props;
		this.setState(
			state => {
				return {
					isSelected: !state.isSelected
				};
			},
			() => onSelectionChanged(id, this.state.isSelected) // notify parent that selection on element has changed
		);
	}
}

CarPreview.propTypes = {
	...carPropTypes,
	isSelected: PropTypes.bool,
	onSelectionChanged: PropTypes.func
};

CarPreview.defaultProps = {
	...carPropDefaults,
	isSelected: false,
	onSelectionChanged: () => {}
};

export default CarPreview;
