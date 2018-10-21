import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme'; // use enzyme to simulate user interaction
import Adapter from 'enzyme-adapter-react-16';

import SearchInput from './SearchInput';

// configure enzyme for react 16
configure({ adapter: new Adapter() });

it('SearchInput renders correctly with default props', () => {
	const tree = renderer.create(<SearchInput />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('SearchInput renders correctly with placeholder', () => {
	const tree = renderer
		.create(<SearchInput placeholder="Test placeholder" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('set input value and invoke search with button click', done => {
	const inputValue = 'Hello';
	// create shallow copy with enzyme
	const wrapper = shallow(
		<SearchInput
			onSearchCallback={search => {
				// when we click on search button this
				// callback need to invoked with input value
				expect(search).toBe(inputValue);
				done();
			}}
		/>
	);

	// get search input
	const searchInput = wrapper.find('input');
	// simulate change of input
	searchInput.simulate('change', { target: { value: inputValue } });
	// take search button
	const searchButton = wrapper.find('button');
	// and then simulate button click to invoke search callback
	searchButton.simulate('click');
});

it('set input value and invoke search with enter key', done => {
	const inputValue = 'Hello';
	// create shallow copy with enzyme
	const wrapper = shallow(
		<SearchInput
			onSearchCallback={search => {
				// when we click on search button this
				// callback need to invoked with input value
				expect(search).toBe(inputValue);
				done();
			}}
		/>
	);

	// get search input
	const searchInput = wrapper.find('input');
	// simulate change of input
	searchInput.simulate('change', { target: { value: inputValue } });
	// simulate keypress event with key enter
	searchInput.simulate('keypress', { key: 'Enter' });
});
