/**
 * Process Management Client
 */


var io = require('socket.io-client');
var _ = require('underscore');
var usage = require('usage');

var pid = process.pid;
var ProcessManager = {};
var Probe = {};


function probeInit() {
  Probe = {
    started: false,
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
    pid:      pid,
    metrics:  {},
  };
  _.each(data, function(val, key) {
    output.metrics[key] = val;
  });
  output.time = new Date().getTime();
  return output;
};


var heartbeat = function() {
  var data = prepareData(Probe.metrics);
  this.socket.send(data);
  /******* DEBUG ********/
  /**/console.log('===============================');
  /**/console.log('Send on' , new Date());
  /**/console.log(data);
  /**********************/
  probeInit();
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
      if (_.isEmpty(opts.name)) {
        return console.error('[Probe][Metric] Name not defined');
      };

      if (opts.data) {
        if (!_.has(Probe.metrics, opts.name)) {
          Probe.metrics[opts.name] = [];
        };
        Probe.metrics[opts.name] = opts.data;
      };

      return {
        set: function(data) {
          if (!_.has(Probe.metrics, opts.name)) Probe.metrics[opts.name] = [];
          Probe.metrics[opts.name].push(data);
        },
      };
    },
  };
};

module.exports = ProcessManager;
