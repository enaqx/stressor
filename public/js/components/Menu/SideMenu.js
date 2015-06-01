/**
 * SideMenu Component
 */

'use strict';

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var SideMenu = React.createClass({
  render: function() {
    return (
      <div>
        <a href = '#menu' id = 'menuLink' className = 'menu-link'>
          <span></span>
        </a>
        <div id = 'menu'>
          <div className = 'pure-menu'>
            <div className = 'pure-menu-heading'>Stressor</div>
            <ul className = 'pure-menu-list'>
              <li><Link to='dashboard' className='pure-menu-item pure-menu-link'>Dashboard</Link></li>
              <li><Link to='server' className='pure-menu-item pure-menu-link'>Server</Link></li>
              <li><Link to='application' className='pure-menu-item pure-menu-link'>Application</Link></li>
              <li><Link to='errors' className='pure-menu-item pure-menu-link'>Errors</Link></li>
              <li><Link to='metrics' className='pure-menu-item pure-menu-link'>Metrics</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SideMenu;
