/**
 * Stressor App Component
 */


'use strict';


var React = require('react');
var SideMenu = require('./SideMenu/SideMenu');
var AreaChart = require('./AreaChart');


var sampleData = [
  {id: '5fbmzmtc', x: 7, y: 41, z: 6},
  {id: 's4f8phwm', x: 11, y: 45, z: 9},
  {id: 's4fsdfwm', x: 13, y: 35, z: 2},
  {id: 's4zccswm', x: 17, y: 10, z: 10},
];


var StressorApp = React.createClass({

	getInitialState: function() {
    return {
      data: sampleData,
      domain: {x: [0, 30], y: [0, 100]}
    };
  },

  render: function() {
  	return (
      <div className="Stressor App">
        <SideMenu />
        <AreaChart
          data={this.state.data}
          domain={this.state.domain} />
      </div>
    );
  }

});


module.exports = StressorApp;
