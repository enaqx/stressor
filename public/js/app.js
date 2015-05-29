/**
 * Stressor App
 */


'use strict';

var stressorURI = 'http://localhost:10002';

require('purecss');
require('../css/side-menu.css');
var React = require('react');
var StressorApp = require('./components/StressorApp');


var io = require('socket.io-client');
var socket = io(stressorURI);

React.render(
  <StressorApp />,
  document.getElementById('stressor')
);
