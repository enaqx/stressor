/**
 * Main Section Component
 */

'use strict';

var React = require('react');
var RandomChart = require('./Charts/RandomChartComponent');
var MemoryChart = require('./Charts/MemoryChartComponent');
var CPUChart = require('./Charts/CPUChartComponent');

var MainSection = React.createClass({
  render: function() {
    return (
      <div className = 'content'>
        <CPUChart />
        <MemoryChart />
        <RandomChart />
      </div>
    );
  }
});

module.exports = MainSection;
