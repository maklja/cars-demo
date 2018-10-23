import PropTypes from 'prop-types';
import React from 'react';

import './ErrorView.css';

export const ErrorView = ({ message, className, error }) => {
	return (
		<div className={className}>
			<div className="error-message">{message || error.toString()}</div>
		</div>
	);
};

ErrorView.propTypes = {
	message: PropTypes.string,
	className: PropTypes.string,
	error: PropTypes.instanceOf(Error).isRequired
};

ErrorView.defaultProps = {
	message: '',
	className: ''
};

// create HOC for error handling
export const withErrorHandler = (
	Component,
	{ message, className = '' } = {}
) => {
	return props => {
		const { error } = props;

		const view =
			error !== null ? (
				<ErrorView
					message={message}
					className={className}
					error={error}
				/>
			) : (
				<Component {...props} />
			);

		return view;
	};
};
