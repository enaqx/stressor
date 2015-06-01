/**
 * Errors Section Component
 */


'use strict';

var React = require('react');
var SideMenu = require('../Menu/SideMenu');


var ErrorsSection = React.createClass({
  render: function() {
    return (
      <div>
        <SideMenu />
        <div className = 'content'>
          <h3>Errors Section</h3>
        </div>
      </div>
    );
  }
});

module.exports = ErrorsSection;
