/**
 * Stressor App Component
 */

'use strict';

var React = require('react');
var SideMenu = require('./SideMenu');
var MainSection = require('./MainSection');

var StressorApp = React.createClass({
  render: function() {
  	return (
      <div className="Stressor App">
      	<SideMenu />
        <MainSection />
      </div>
    );
  }
});

module.exports = StressorApp;
