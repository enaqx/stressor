/**
 * Metric Section Component
 */


'use strict';

var React = require('react');
var SideMenu = require('../Menu/SideMenu');
var RandomChart = require('../Charts/RandomChartComponent');
var MemoryChart = require('../Charts/MemoryChartComponent');
var CPUChart = require('../Charts/CPUChartComponent');


var MainSection = React.createClass({
  render: function() {
    return (
      <div>
        <SideMenu />
        <div className = 'content'>
          <CPUChart />
          <MemoryChart />
          <RandomChart />
        </div>
      </div>
    );
  }
});

module.exports = MainSection;
