import React from 'react';
import renderer from 'react-test-renderer';

import { ErrorView } from './ErrorView';

it('ErrorView renders correctly with error', () => {
	const error = new Error('Request error');
	const tree = renderer.create(<ErrorView error={error} />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('ErrorView renders correctly with error and message prop', () => {
	const error = new Error('Request error');
	const message = 'Unable to fetch cars from server.';
	const tree = renderer
		.create(<ErrorView message={message} error={error} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('ErrorView renders correctly with className and error', () => {
	const error = new Error('Request error');
	const tree = renderer
		.create(<ErrorView className="error-msg" error={error} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
