/**
 * Example Client for Stressor with Random Data Generation
 */

var pm = require('../pm/pm');

pm.connect({}, function () {
  var probe = pm.probe();
  var randomDataMetric = probe.metric({
    metricName: 'RandomDataMetric',
    processName: 'ProcessName',
  });

  setInterval(function() {
    randomDataMetric.set(Math.random() * 100);
  }, 100);
});
