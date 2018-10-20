import PropTypes from 'prop-types';

// car prop type
export const carPropTypes = PropTypes.shape({
	image: PropTypes.string,
	speed: PropTypes.number,
	description: PropTypes.string,
	name: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired
});
