/**
 * Point Chart Component
 */

'use strict';

var React = require('react');
var pointChart = require('../../charts/pointChart');

var PointChart = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object
  },

  componentDidMount: function() {
    var el = this.getDOMNode();
    pointChart.create(el, {
      width: '100%',
      height: '300px'
    }, this.getChartState());
  },

  componentDidUpdate: function() {
    var el = this.getDOMNode();
    pointChart.update(el, this.getChartState());
  },

  getChartState: function() {
    return {
      data: this.props.data,
      domain: this.props.domain
    };
  },

  componentWillUnmount: function() {
    var el = this.getDOMNode();
    pointChart.destroy(el);
  },

  render: function() {
    return (
      <div className="PointChart"></div>
    );
  }
});

module.exports = PointChart;
