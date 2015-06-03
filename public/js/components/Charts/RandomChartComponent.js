/**
 * Random Chart Component
 */
'use strict';

var React = require('react');
var c3 = require('c3');
var io = require('socket.io-client');
var _ = require('underscore');

var socket = io('http://localhost:10002');

var RandomChart = React.createClass({
  getInitialState: function() {
    return {
      chart: null,
    }
  },

  componentDidMount: function() {
    var chart = c3.generate({
      bindto: '#randomchart',
      data: {
        x: 'x',
        columns: [],
        type: 'bar',
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%H:%M:%S'
          }
        }
      },
      bar: {
        width: {
          ratio: 1
        }
      },
      transition: {
        duration: 0
      },
      color: {
        // pattern: ['#FED100', '#D52B1E', '#1E1E1E']
      },
    });

    this.setState({chart: chart});
    this.interval = setInterval(this.tick, 1000);
  },

  tick: function() {
    var chart = this.state.chart;
    chart.groups([this.props.colNames]);
    chart.load({
      columns: this.props.col,
    })
    this.setState({chart: chart});
  },

  render: function() {
    return (
      <div>
        <h1>Random Data Metric</h1>
        <div id='randomchart'></div>
      </div>
    );
  }
});

module.exports = RandomChart;
