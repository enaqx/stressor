/**
 * Stressor Dashboard Webserver
 */

var _ = require('underscore');
var io = require('socket.io').listen(10002);


var buff = [];
var lastSentSecond = 0;


io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    // Current second of recieved message
    var recievedSecond = Math.round(data.time / 1000);

    // Find position of second in buffer
    var pos = _.find(buff, function(buffElem) {
      return buffElem.time === recievedSecond;
    });

    // If buffer does not contain this second yet then add it to buffer
    if (_.isUndefined(pos)) {
      var length = buff.push({time: recievedSecond, metrics: {}});
      _.each(data.metrics, function(metricData, metricName) {
        buff[length - 1].metrics[metricName] = {};
        buff[length - 1].metrics[metricName].pid = data.pid;
        buff[length - 1].metrics[metricName].data = metricData;
      });
    } else {
      // console.log('defined');
    }


    /* _.each(data, function(probe) {
      _.each(probe, function(d) {
        var seconds = Math.round(d.time / 1000);
        if ((buff['s' + seconds] === undefined)
            && (seconds > lastSecond)) {
          // console.log('add:', seconds, 'last:', lastSecond);
          // buff['s' + seconds] = [];
          buff['s' + seconds] = {};
          buff['s' + seconds][probe] = {};
        }
        if (buff['s' + seconds] !== undefined) {
          // buff['s' + seconds].push(d.value);
          // buff['s' + seconds].TextMetric.push(d.value);
        }
      });
    }); */

    // console.log(buff);
  });
});

var sendClient = function() {
  var secondToSend =
    _.max(_.map(Object.keys(buff), function(key) {
      return key.slice(1, key.length)
    }));
  var totalToSend = {};
  _.each(buff['s' + secondToSend], function(elem) {
    if(!_.isUndefined(elem)) {
      /* _.each(elem, function(e) {
        if(!_.isUndefined(e.pid)) totalToSend['pid' + e.pid] = {};
        _.each(Object.keys(totalToSend), function(k) {
          // totalToSend[k].data = 0;
          if (('pid' + e.pid) === k) {
            totalToSend[k].data = e.data;
            totalToSend[k].mem = e.mem;
            totalToSend[k].cpu = e.cpu;
          }
        });
      }); */
      if(!_.isUndefined(elem.pid)) totalToSend.pid = elem.pid;
      if(!_.isUndefined(elem.data)) totalToSend.data = elem.data;
      if(!_.isUndefined(elem.mem))
        totalToSend.mem = +(elem.mem / 1024 / 1024).toFixed(2);
      if(!_.isUndefined(elem.cpu)) totalToSend.cpu = elem.cpu;
    }
  });
  if (secondToSend !== -Infinity) {
    // console.log('send and delete for', secondToSend);
  }
  // console.log(totalToSend);
  io.emit('data', totalToSend);
  lastSecond = secondToSend;
  delete buff['s' + secondToSend];
}

setInterval(sendClient, 1000);
