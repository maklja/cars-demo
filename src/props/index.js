import PropTypes from 'prop-types';

// car prop type
export const carPropTypes = {
	image: PropTypes.string,
	speed: PropTypes.number,
	description: PropTypes.string,
	name: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired
};

export const carPropDefaults = {
	image: '',
	speed: 0,
	description: ''
};
