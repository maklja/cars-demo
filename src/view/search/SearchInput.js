import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './SearchInput.css';

export default class SearchInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ''
		};

		this._onChange = this._onChange.bind(this);
		this._onKeyPress = this._onKeyPress.bind(this);
		this._onSearch = this._onSearch.bind(this);
	}

	render() {
		const { placeholder } = this.props;
		const { value } = this.state;

		return (
			<div className="search-input">
				<input
					placeholder={placeholder}
					className="control search-input__input"
					type="text"
					onChange={this._onChange}
					onKeyPress={this._onKeyPress}
					value={value}
				/>
				<button
					className="button-control search-input__button"
					onClick={this._onSearch}
				>
					<i className="icon-search" />
				</button>
			</div>
		);
	}

	_onKeyPress(e) {
		if (e.key === 'Enter') {
			this._onSearch();
		}
	}

	_onSearch() {
		const { value } = this.state;

		this.props.onSearchCallback(value);
	}

	_onChange(e) {
		this.setState({
			value: e.target.value
		});
	}
}

SearchInput.propTypes = {
	onSearchCallback: PropTypes.func,
	placeholder: PropTypes.string
};

SearchInput.defaultProps = {
	onSearchCallback: () => {},
	placeholder: ''
};
