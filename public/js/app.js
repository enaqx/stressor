/**
 * Stressor App 
 */

var React = require('react');
var StressorApp = require('./components/StressorApp');

React.render(
  <StressorApp name="John" />,
  document.getElementById('stressor')
);
