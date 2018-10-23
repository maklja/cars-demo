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
		const {
			id,
			speed,
			name,
			image,
			description,
			disableSelection
		} = this.props;
		const { isSelected } = this.state;

		return (
			<div
				className={`car-preview ${
					isSelected ? 'car-preview--selected' : '' // is selected put border around tile
				} ${disableSelection ? 'car-preview--disabled' : ''}`}
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
		const { id, onSelectionChanged, disableSelection } = this.props;

		// if selection is disable, just return
		if (disableSelection) {
			return;
		}

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
	onSelectionChanged: PropTypes.func,
	disableSelection: PropTypes.bool
};

CarPreview.defaultProps = {
	...carPropDefaults,
	isSelected: false,
	onSelectionChanged: () => {},
	disableSelection: false
};

export default CarPreview;
