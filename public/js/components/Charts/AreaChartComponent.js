/**
 * Area Chart Component
 */


'use strict';


var React = require('react');
var areaChart = require('../../charts/areaChart');


var AreaChart = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object
  },

  componentDidMount: function() {
    var el = this.getDOMNode();
    areaChart.create(el, {
      width: '100%',
      height: '300px'
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
      <div className="AreaChart"></div>
    );
  }
});

module.exports = AreaChart;

