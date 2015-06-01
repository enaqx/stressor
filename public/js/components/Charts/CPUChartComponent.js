/**
 * CPU Chart Component
 */

var React = require('react');
var c3 = require('c3');
var io = require('socket.io-client');
var _ = require('underscore');

var socket = io('http://localhost:10002');

var CPUChart = React.createClass({
	componentDidMount: function() {
    var colValues = 182;
    var colNames = [];
    var timeData = ['x'];
    for (var i = 0; i < (colValues - 1); i++) {
      timeData[i + 1] =
        (Math.round((Date.now() / 1000)) - (colValues + 2) + i) * 1000;
    }
    var col = [timeData];

    var chart = c3.generate({
      bindto: '#cpuchart',
      data: {
        x: 'x',
        columns: col,
        type: 'bar',
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%H:%M:%S'
          }
        },
        y: {
          max: 90,
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
        pattern: ['#FED100', '#D52B1E', '#1E1E1E']
      },
    });

    /* socket.on('data', function(msg) {
      timeData.push(msg.time * 1000);
      _.each(msg.metrics.CPUMetric, function(elem) {
        var result = 0;
            sum = 0;
            length = elem.data.length;
        for (var i = 0; i < length; i++) {
          sum += elem.data[i];
        }
        result = (sum / length).toFixed(2);

        if (colNames.indexOf(elem.name) === -1) {
          colNames.push(elem.name);
          var colToInsert = [elem.name];
          for (var i = 0; i < (colValues - 1); i++) colToInsert.push(0);
          colToInsert.push(result);
          col.push(colToInsert);
        } else {
          col[colNames.indexOf(elem.name) + 1].push(result);
        };
      });

      _.each(col, function(colName, colNameIndex) {
        if (colName.length < colValues) {
          col[colNameIndex].push(0);
        }

        if (colName.length > colValues) {
          col[colNameIndex].splice(1, 1);
        };
      });

      chart.groups([colNames]);
      chart.load({
        columns: col,
      });
    }); */
  },

  render: function() {
    return (
      <div>
        <h1>CPU Metric</h1>
        <div id='cpuchart'></div>
      </div>
    );
  }
});

module.exports = CPUChart;
