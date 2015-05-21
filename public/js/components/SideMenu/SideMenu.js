/**
 * SideMenu Component
 */


'use strict';


var React = require('react');


var SideMenu = React.createClass({

	render: function() {
		return (
			<div id = 'menu'>
        <div className = 'pure-menu'>
          <a className = 'pure-menu-heading' href="#">Menu</a>

          <ul className = 'pure-menu-list'>
            <li className = 'pure-menu-item'>
            	<a href = '#' className = 'pure-menu-link'>Home</a>
            </li>

            <li className = 'pure-menu-item'>
            	<a href='#' className = 'pure-menu-link'>About</a>
            </li>

            <li className = 'pure-menu-item
            								 menu-item-divided pure-menu-selected'>
              <a href='#' className = 'pure-menu-link'>Services</a>
            </li>

            <li className= 'pure-menu-item'>
            	<a href = '#' className = 'pure-menu-link'>Contact</a>
            </li>
          </ul>

        </div>
    </div>
		);
	}

});


module.exports = SideMenu;