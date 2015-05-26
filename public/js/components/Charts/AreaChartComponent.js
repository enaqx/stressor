/**
 * Area Chart Component
 */

var React = require('react');
var c3 = require('c3');
var io = require('socket.io-client');

var socket = io('http://localhost:10002');

var AreaChart = React.createClass({
  componentDidMount: function() {
    var chartData = ['data'];
    var timeData = ['x'];
    for (var i = 1; i <= 180; i++) {
      chartData.push(0);
      timeData.push(Date.now() - ((181 - i)*1000));
    }

    var chart = c3.generate({
      bindto: '#chart',
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
      chartData.push(msg.value.data);
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
    return (<div id='chart'></div>);
  }
});


/* var areaChart = require('../../charts/areaChart');

var AreaChart = React.createClass({
	propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object
  },

  componentDidMount: function() {
    var el = this.getDOMNode();
    areaChart.create(el, {
      width: 100,
      height: 300
    }, this.getChartState());
  },

  componentDidUpdate: function() {
    var el = this.getDOMNode();
    areaChart.update(el, this.getChartState());
  },

  getChartState: function() {
    return {
      data: this.props.data,
      domain: this.props.domain
    };
  },

  componentWillUnmount: function() {
    var el = this.getDOMNode();
    areaChart.destroy(el);
  },

  render: function() {
    return (
      <div className='AreaChart'></div>
    );
  }
}); */

module.exports = AreaChart;
