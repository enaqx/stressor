var usage = require('usage');
var pm = require('./pm');

var randomVal = 123;
var pid = process.pid

pm.connect({}, function (){
  console.log ("PM Connected!");
  var probe = pm.probe();
  var metric = probe.metric({
    name: "TextMetric",
    value: function(){
      return randomVal;
    }
  });

  setInterval(function() {
    usage.lookup(pid, function(err, res) {
      metric.set({
        data: Math.random() * (300 - 100) + 100,
        pid: pid,
        mem: res.memory,
        cpu: res.cpu,
      });
    });
  }, 100);
});
