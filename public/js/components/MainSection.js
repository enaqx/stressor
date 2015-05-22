/**
 * Main Section Component
 */

'use strict';

var React = require('react');
var AreaChart = require('./Charts/AreaChartComponent');
var Pagination = require('./Pagination.js');

var sampleData = [
  {id: '5fbmzmtc', x: 7, y: 41, z: 6},
  {id: 's4f8phwm', x: 11, y: 45, z: 9},
  {id: 's4fsdfwm', x: 13, y: 35, z: 2},
  {id: 's4zccswm', x: 17, y: 10, z: 10},
];

var MainSection = React.createClass({
  getInitialState: function() {
    var xDomain = [0, 30];
    var yDomain = [0, 100];
    return {
      data: sampleData,
      domain: {
        x: xDomain,
        y: yDomain,
      },
    };
  },

  getData: function(domain) {
    return _.filter(sampleData, this.isInDomain.bind(null, domain));
  },

  isInDomain: function(domain, d) {
    return d.x >= domain[0] && d.x <= domain[1];
  },

  setAppState: function(partialState, callback) {
    return this.setState(partialState, callback);
  },

  render: function() {
    return (
      <div className = 'content'>
        <Pagination
          domain={this.domain}
          getData={this.getData}
          setAppState={this.setAppState} />
        <AreaChart
          data={this.state.data}
          domain={this.state.domain} />
      </div>
    );
  }
});

module.exports = MainSection;
