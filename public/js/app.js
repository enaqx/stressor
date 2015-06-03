/**
 * Stressor App
 */
'use strict';

var stressorURI = 'http://localhost:10002';

require('purecss');
require('../css/side-menu.css');

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var SideMenu = require('./components/Menu/SideMenu');
var ApplicationSection = require('./components/Sections/Application');
var DashboardSection = require('./components/Sections/Dashboard');
var ErrorsSection = require('./components/Sections/Errors');
var MetricsSection = require('./components/Sections/Metrics');
var ServerSection = require('./components/Sections/Server');


var StressorApp = React.createClass({
  render: function () {
    return (
      <div>
        <SideMenu />
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name = 'stressor' path = '/' handler = {StressorApp} >
    <Route name = 'dashboard' handler = {DashboardSection} />
    <Route name = 'server' handler = {ServerSection} />
    <Route name = 'application' handler = {ApplicationSection} />
    <Route name = 'errors' handler = {ErrorsSection} />
    <Route name = 'metrics' handler = {MetricsSection} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(
  	<Handler />,
  	document.getElementById('stressor')
  );
});
