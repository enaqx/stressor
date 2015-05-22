/**
 * Pagination Component
 */

'use strict';

var _ = require('lodash');
var React = require('react');

var Pagination = React.createClass({
  propTypes: {
    domain: React.PropTypes.object,
    getData: React.PropTypes.func,
    setAppState: React.PropTypes.func,
  },

  render: function() {
    return (
      <p>
        {'Pages: '}
        <a href="#" onClick={this.handlePrevious}>Previous</a>
        <span> - </span>
        <a href="#" onClick={this.handleNext}>Next</a>
      </p>
    );
  },

  handlePrevious: function(e) {
    e.preventDefault();
    this.shiftData(-20);
  },

  handleNext: function(e) {
    e.preventDefault();
    this.shiftData(+20);
  },

  shiftData: function(step) {
    var newDomain = _.cloneDeep(this.props.domain);
    newDomain.x = _.map(newDomain.x, function(x) {
      return x + step;
    });
    var newData = this.props.getData(newDomain);
    this.props.setAppState({
      data: newData,
      domain: newDomain,
    });
  }
});

module.exports = Pagination;