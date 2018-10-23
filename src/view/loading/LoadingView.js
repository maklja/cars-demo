import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'spinkit/css/spinners/8-circle.css'; // small library for spinner animations

import './LoadingView.css';

export default class LoadingSpinner extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: props.visible
		};

		const spinnerCircleCount = 12; // 12 circles of spinner
		this._spinnerCircles = [];

		for (let i = 0; i < spinnerCircleCount; i++) {
			this._spinnerCircles.push(
				<div key={i} className={'sk-circle' + (i + 1) + ' sk-child'} />
			);
		}
	}

	componentDidMount() {
		const { delay } = this.props;
		// wait few sec before loading spinner is shown
		// some operations can last only few ms
		// in this case we don't what to "blink" spinner
		// on the screen and then hide it immediately
		// we use delay to controll this
		if (delay > 0) {
			this.visibleDelayTimeoutId = setTimeout(() => {
				this.setState({ visible: true });
			}, delay);
		}
	}

	componentWillUnmount() {
		// clear timeout on component unmount
		clearTimeout(this.visibleDelayTimeoutId);
	}

	render() {
		const { text } = this.props;
		const { visible } = this.state;
		return (
			<div
				className={`loading-spinner ${
					visible ? '' : 'loading-spinner--hidden'
				}`}
			>
				<div className="sk-circle">{this._spinnerCircles}</div>
				<div className="loading-spinner__text">
					<span>{text}</span>
				</div>
			</div>
		);
	}
}

LoadingSpinner.propTypes = {
	text: PropTypes.string,
	visible: PropTypes.bool,
	delay: PropTypes.number
};

LoadingSpinner.defaultProps = {
	text: '',
	visible: false,
	delay: 0
};

// create HOC for loading
export const withLoading = (
	Component, // React component
	{ delay = 2000, text = 'Loading data, please wait...', className = '' } = {} // options
) => {
	return props => {
		const { loading } = props;
		const view = loading ? (
			<div className={className}>
				<LoadingSpinner delay={delay} text={text} />
			</div>
		) : (
			<Component {...props} />
		);

		return view;
	};
};
