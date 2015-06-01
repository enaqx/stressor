/**
 * Dashboard Section Component
 */


'use strict';

var React = require('react');
var SideMenu = require('../Menu/SideMenu');


var DashboardSection = React.createClass({
  render: function() {
    return (
      <div>
        <SideMenu />
        <div className = 'content'>
          <h3>Dashboard Section</h3>
        </div>
      </div>
    );
  }
});

module.exports = DashboardSection;
