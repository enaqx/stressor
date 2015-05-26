var io = require('socket.io-client');
var _ = require('underscore');

var ProcessManager = {};
var Probe = {
  started: false,
  data: {},
};

function prepareData(data) {
  var output = {};
  _.each(data, function(val, key) {
    if (_.isFunction(val.value)) {
      val.value = value();
    };
    output[key] = val;
  });
  return output;
};

var heartbeat = function() {
  var data = prepareData(Probe.data);
  this.socket.send(data);
  Probe.data = {};
  console.log(new Date);
}

ProcessManager.connect = function(opts, cb) {
  this.host = opts.host || "http://localhost";
  this.port = opts.port || 10002;

  this.socket = io.connect(this.host + ":" + this.port);

  this.socket.on('connect', function() {
    console.log("connected");
    cb();
  });
  this.socket.on('event', function(data) {
    console.log("event");
  });
  this.socket.on('disconnect', function() {
    console.log("disconnect");
  });
  this.socket.on('error', function() {
    console.log("error", arguments);
  });
}

ProcessManager.probe = function() {
  if (Probe.started == false) {
    Probe.started = true;

    setInterval(heartbeat.bind(this), 1000);
  }

  return {
    metric: function(opts) {

      if (_.isEmpty(opts.name)) {
        return console.error('[Probe][Metric] Name not defined');
      }
      if (_.isUndefined(opts.value)) {
        return console.error('[Probe][Metric] Value not defined');
      }

      if (opts.value) {
        if (!_.has(Probe.data, opts.name)) {
          Probe.data[opts.name] = [];
        }
        Probe.data[opts.name].push({
          value: opts.value,
          time: new Date().getTime()
        });
      }

      return {
        val: function() {
          var value = Probe.data[opts.name].value;
          if (_.isFunction(value)) {
            value = value();
          }
          return value;
        },
        set: function(value) {
          if (!_.has(Probe.data, opts.name)) Probe.data[opts.name] = [];
          Probe.data[opts.name].push({
            value: value,
            time: new Date().getTime()
          });
        }
      }
    }
  }
}

module.exports = ProcessManager;
