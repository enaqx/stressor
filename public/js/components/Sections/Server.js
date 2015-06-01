/**
 * Server Section Component
 */


'use strict';

var React = require('react');
var SideMenu = require('../Menu/SideMenu');


var ServerSection = React.createClass({
  render: function() {
    return (
      <div>
        <SideMenu />
        <div className = 'content'>
          <h3>Server Section</h3>
        </div>
      </div>
    );
  }
});

module.exports = ServerSection;
