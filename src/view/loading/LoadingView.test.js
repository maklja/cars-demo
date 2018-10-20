import React from 'react';
import renderer from 'react-test-renderer';

import LoadingView from './LoadingView';

it('LoadingView renders correctly with default props', () => {
	const tree = renderer.create(<LoadingView />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('LoadingView renders correctly with custom text message', () => {
	const tree = renderer
		.create(<LoadingView visible={true} text="Loading message" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('LoadingView renders correctly with delay and custom message', () => {
	jest.useFakeTimers(); // we need to controll setTimeout trigger inside LoadingView

	const loadingViewInstance = renderer.create(
		<LoadingView delay={10000} text="Loading message" />
	);

	// init state of instance will be { visible: false }
	const treeLoadingViewHidden = loadingViewInstance.toJSON();
	expect(treeLoadingViewHidden).toMatchSnapshot();

	jest.runOnlyPendingTimers(); // trigger timeout to make LoadingView component visible

	// check same instance with now new state { visible: true }
	const treeLoadingViewVisible = loadingViewInstance.toJSON();
	expect(treeLoadingViewVisible).toMatchSnapshot();
});
