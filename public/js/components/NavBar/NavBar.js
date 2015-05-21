/**
 * NavBar Component
 */


'use strict';


var React = require('react');
var NavBarHeader = require('./NavBarHeader');


var NavBar = React.createClass({

	render: function() {
		return (
			<nav class="navbar navbar-inverse navbar-fixed-top">
				<div class="container-fluid">
					<NavBarHeader />
				</div>
			</nav>
		);
	}

});


module.exports = NavBar;
