/**
 * Application Section Component
 */


'use strict';

var React = require('react');
var SideMenu = require('../Menu/SideMenu');


var ApplicationSection = React.createClass({
  render: function() {
    return (
      <div>
        <SideMenu />
        <div className = 'content'>
          <h3>Application Section</h3>
        </div>
      </div>
    );
  }
});

module.exports = ApplicationSection;
