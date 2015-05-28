/**
 * Client for Stressor Web with Random Data Generation
 */

var pm = require('./pm');

pm.connect({}, function () {
  var probe = pm.probe();
  var randomDataMetric = probe.metric({
    metricName: 'RandomDataMetric',
    processName: 'ProcessName',
  });

  setInterval(function() {
    randomDataMetric.set(Math.random() * (300 - 100) + 100);
  }, 100);
});
