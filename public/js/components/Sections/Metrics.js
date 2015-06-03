/**
 * Metric Section Component
 */
'use strict';

var io = require('socket.io-client');
var _ = require('underscore');

var React = require('react');
var SideMenu = require('../Menu/SideMenu');
var RandomChart = require('../Charts/RandomChartComponent');
var MemoryChart = require('../Charts/MemoryChartComponent');
var CPUChart = require('../Charts/CPUChartComponent');

var socket = io('http://localhost:10002');

var MainSection = React.createClass({

  getInitialState: function() {
    var colValues = 182;
    var timeData = ['x'];
    for (var i = 0; i < (colValues - 1); i++) {
      timeData[i + 1] =
        (Math.round((Date.now() / 1000)) - (colValues + 2) + i) * 1000;
    }
    var colNames = {};
    var col = {};
    return {
      colValues: colValues,
      timeData: timeData,
      colNames: colNames,
      col: col,
    }
  },

  componentDidMount: function() {
    var self = this
    socket.on('data', function(msg) {

      // Update TimeData for every tick
      var timeData = self.state.timeData;
      timeData.push(msg.time * 1000);
      self.setState({timeData: timeData});

      // Passage through metrics
      _.each(msg.metrics, function(metric, metricName) {

        _.each(metric, function(elem) {
          // Metric not present in state
          if(!_.has(self.state.colNames, metricName)) {
            var colNames = self.state.colNames;
            var col = self.state.col;
            colNames[metricName] = [];
            col[metricName] = [self.state.timeData];
            self.setState({
              colNames: colNames,
              col: col,
            });
          }

          // Calculate average value
          var result = 0,
              sum = 0,
              length = elem.data.length;
          for (var i = 0; i < length; i++) {
            sum += elem.data[i];
          }
          result = (sum / length).toFixed(2);


          if (self.state.colNames[metricName].indexOf(elem.name) === -1) {
            var colNames = self.state.colNames;
            colNames[metricName].push(elem.name);
            self.setState({colNames: colNames});

            var colToInsert = [elem.name];
            for (var i = 0; i < (self.state.colValues - 1); i++) {
              colToInsert.push(0);
            }
            colToInsert.push(result);

            console.log(colToInsert);

            var col = self.state.col;
            col[metricName].push(colToInsert);
            self.setState({col: col});

          } else {
            var col = self.state.col;
            col[metricName][self.state.colNames[metricName]
              .indexOf(elem.name) + 1].push(result);
            self.setState({col: col});
          };
        });

        _.each(self.state.col[metricName], function(colName, colNameIndex) {
          if (colName.length < self.state.colValues) {
            var col = self.state.col;
            col[metricName][colNameIndex].push(0);
            self.setState({col: col});
          }

          if (colName.length > self.state.colValues) {
            var col = self.state.col;
            col[metricName][colNameIndex].splice(1, 1);
            self.setState({col: col});
          };
        });
      });
    });
  },

  render: function() {
    return (
      <div>
        <SideMenu />
        <div className = 'content'>
          <CPUChart
            col = {this.state.col.CPUMetric}
            colNames = {this.state.colNames.CPUMetric} />

          <MemoryChart
            col = {this.state.col.MemoryMetric}
            colNames = {this.state.colNames.MemoryMetric} />

          <RandomChart
            col = {this.state.col.RandomDataMetric}
            colNames = {this.state.colNames.RandomDataMetric} />

        </div>
      </div>
    );
  }

});

module.exports = MainSection;
