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
    var chartData = {};
    var timeData = ['x'];
    var col = [
      timeData,
      ['pid#3323'],
      ['pid#3327'],
      ['pid#3329']
    ];
    for (var i = 1; i <= 180; i++) {
      col[0].push(30);
      col[1].push(Math.random() * (300 - 100) + 100);
      col[2].push(Math.random() * (300 - 100) + 100);
      col[3].push(Math.random() * (300 - 100) + 100);
    }

    /* var chart = c3.generate({
      bindto: '#cpuchart',
      data: {
        x: 'x',
        xFormat: '%H:%M:%S',
        columns: [
          timeData,
          chartData
        ],
        types: {
          cpu: 'bar'
        },
        colors: {
      		cpu: '#333300',
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
      },
      zoom: {
        enabled: true
      }
    }); */

    var chart = c3.generate({
      bindto: '#cpuchart',
      data: {
        columns: col,
        type: 'bar',
        groups: [
          [col[0][0], col[1][0], col[2][0], col[3][0]],
        ]
      },
      grid: {
        y: {
          lines: [{value:0}]
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
      }
    );

    socket.on('data', function(msg) {
      _.each(msg.metrics.CPUMetric, function(elem) {
        var result = 0;
            sum = 0;
            length = elem.data.length;
        for (var i = 0; i < length; i++) {
          sum += elem.data[i];
        }
        result = sum / length;

        //console.log(elem.name, result);
        var colNames = _.map(col, function(elem) {return elem[0]});

      });

      // chartData.push(msg.metrics.CPUMetric);
      // chartData.shift();
      /* timeData.push(new Date());
      timeData.shift();
      chart.load({
        columns: [
          timeData,
          ['data1', -30, 200, 200, 400, -150, 250],
          ['data2', 130, 100, -100, 200, -150, 50],
          ['data3', -230, 200, 200, -300, 250, 250]
        ]
      }); */
    });
  },

  render: function() {
    return (<div id='cpuchart'></div>);
  }
});

module.exports = CPUChart;
