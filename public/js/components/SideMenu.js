/**
 * SideMenu Component
 */

'use strict';

var React = require('react');

var SideMenu = React.createClass({
  render: function() {
    return (
      <div>
        <a href = '#menu' id = 'menuLink' className = 'menu-link'>
          <span></span>
        </a>
        <div id = 'menu'>
          <div className = 'pure-menu'>
            <a className = 'pure-menu-heading' href="#">Stressor</a>
            <ul className = 'pure-menu-list'>
              <li className = 'pure-menu-item'>
                <a href = '#' className = 'pure-menu-link'>Dashboard</a>
              </li>
              <li className = 'pure-menu-item'>
                <a href='#' className = 'pure-menu-link'>Server</a>
              </li>
              <li className = 'pure-menu-item'>
                <a href='#' className = 'pure-menu-link'>App</a>
              </li>
              <li className = 'pure-menu-item'>
                <a href = '#' className = 'pure-menu-link'>Metrics</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SideMenu;