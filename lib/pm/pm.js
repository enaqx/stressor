/**
 * Process Management Client
 */


var io = require('socket.io-client');
var _ = require('underscore');
var usage = require('usage');

var pid = process.pid;
var ProcessManager = {};
var Probe = {};


function probeInit(processName) {
  Probe = {
    started: false,
    processName: processName,
    metrics: {
      CPUMetric: [],
      MemoryMetric: [],
    },
  };
};
probeInit();


setInterval(function() {usage.lookup(pid, function(err, result) {
  Probe.metrics.CPUMetric.push(result.cpu);
  Probe.metrics.MemoryMetric.push(result.memory);
})}, 100);


function prepareData(data) {
  var output = {
    pid:          pid,
    processName:  data.processName,
    metrics:      {},
  };
  _.each(data.metrics, function(val, key) {
    output.metrics[key] = val;
  });
  output.time = new Date().getTime();
  return output;
};


var heartbeat = function() {
  var data = prepareData(Probe);
  this.socket.send(data);
  /****** DEBUG ********/
  console.log('===============================');
  console.log('Send on' , new Date());
  console.log(data);
  /**********************/
  probeInit(data.processName);
};


ProcessManager.connect = function(opts, cb) {
  this.host = opts.host || 'http://localhost';
  this.port = opts.port || 10002;
  this.socket = io.connect(this.host + ":" + this.port);
  this.socket.on('connect', function() {
    console.log('connected');
    cb();
  });
  this.socket.on('event', function(data) {
    console.log('event');
  });
  this.socket.on('disconnect', function() {
    console.log('disconnect');
  });
  this.socket.on('error', function() {
    console.log('error', arguments);
  });
};


ProcessManager.probe = function() {
  if (Probe.started == false) {
    Probe.started = true;
    setInterval(heartbeat.bind(this), 1000);
  };

  return {
    metric: function(opts) {
      if (_.isEmpty(opts.metricName)) {
        return console.error('[Probe][Metric] Metric Name not defined');
      };

      if (_.isEmpty(opts.processName)) {
        return console.error('[Probe][Metric] Process Name not defined');
      };
      Probe.processName = opts.processName;

      if (opts.data) {
        Probe.processName = opts.processName;
        if (!_.has(Probe.metrics, opts.metricName)) {
          Probe.metrics[opts.metricName] = [];
        };
        Probe.metrics[opts.metricName] = opts.data;
      };

      return {
        set: function(data) {
          if (!_.has(Probe.metrics, opts.metricName)) {
            Probe.metrics[opts.metricName] = [];
          }
          Probe.metrics[opts.metricName].push(data);
        },
      };
    },
  };
};

module.exports = ProcessManager;
