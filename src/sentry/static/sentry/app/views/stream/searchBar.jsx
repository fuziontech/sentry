import React from "react";
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

import SearchDropdown from "./searchDropdown";

var SearchBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      defaultQuery: "",
      query: "",
      onSearch: function() {},
      onQueryChange: function() {}
    };
  },

  getInitialState() {
    return {
      query: this.props.query || this.props.defaultQuery,
      dropdownVisible: false
    };
  },

  blur() {
    this.refs.searchInput.getDOMNode().blur();
  },

  onSubmit(event) {
    event.preventDefault();
    this.blur();
    this.props.onSearch(this.state.query);
  },

  clearSearch() {
    this.setState(
      { query: this.props.defaultQuery },
      () => this.props.onSearch(this.state.query)
    );
  },

  onQueryFocus() {
    this.setState({
      dropdownVisible: true
    });
  },

  onQueryBlur() {
    this.setState({
      dropdownVisible: false
    });
  },

  onQueryChange(event) {
    this.setState(
      { query: event.target.value },
      () => this.props.onQueryChange(this.state.query)
    );
  },

  onKeyUp(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      // blur handler should additionally hide dropdown
      this.blur();
    }
  },

  render() {
    var dropdownStyle = {
      display: this.state.dropdownVisible ? 'block' : 'none'
    };

    return (
      <div className="search">
        <form className="form-horizontal" ref="searchForm" onSubmit={this.onSubmit}>
          <div>
            <input type="text" className="search-input form-control"
              placeholder={this.props.placeholder}
              name="query"
              ref="searchInput"
              autoComplete="off"
              value={this.state.query}
              onFocus={this.onQueryFocus}
              onBlur={this.onQueryBlur}
              onKeyUp={this.onKeyUp}
              onChange={this.onQueryChange} />
            <span className="icon-search" />
            {this.state.query !== this.props.defaultQuery &&
              <div>
                <a className="search-clear-form" onClick={this.clearSearch}>
                  <span className="icon-circle-cross" />
                </a>
              </div>
            }
          </div>

          {function() {
            if (this.props.children) {
              return <div style={dropdownStyle}>{this.props.children}</div>;
            }
          }.call(this)}
        </form>
      </div>
    );
  }
});

export default SearchBar;
