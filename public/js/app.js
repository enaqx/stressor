/**
 * Stressor App
 */


'use strict';

require('purecss');
require('../css/side-menu.css');
var React = require('react');
var StressorApp = require('./components/StressorApp');


React.render(
  <StressorApp />,
  document.getElementById('stressor')
);
