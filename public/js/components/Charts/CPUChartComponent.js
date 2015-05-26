/**
 * CPU Chart Component
 */

var React = require('react');
var c3 = require('c3');
var io = require('socket.io-client');

var socket = io('http://localhost:10002');

var CPUChart = React.createClass({
	componentDidMount: function() {
    var chartData = ['data'];
    var timeData = ['x'];
    for (var i = 1; i <= 180; i++) {
      chartData.push(0);
      timeData.push(Date.now() - ((181 - i)*1000));
    }

    var chart = c3.generate({
      bindto: '#cpuchart',
      data: {
        x: 'x',
        xFormat: '%H:%M:%S',
        columns: [
          timeData,
          chartData
        ],
        types: {
          data: 'bar'
        },
        colors: {
      		data: '#333300',
      	},
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
      }
    });

    socket.on('data', function(msg) {
      chartData.push(msg.value.cpu);
      chartData.splice(1, 1);
      timeData.push(new Date());
      timeData.splice(1, 1);
      chart.load({
        columns: [
          timeData,
          chartData
        ]
      });
    });
  },

  render: function() {
    return (<div id='cpuchart'></div>);
  }
});

module.exports = CPUChart;
