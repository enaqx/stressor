/**
 * Stressor Collection
 */

var _ = require('underscore');
var io = require('socket.io').listen(10002);


var buff = [];
var lastSentSecond = 0;
var delay = 5;


io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    // Current second of recieved message
    var recievedSecond = Math.round(data.time / 1000);

    // Find position of second in the buffer
    var pos = _.indexOf(buff, _.find(buff, function(buffElem) {
      return buffElem.time === recievedSecond;
    }));

    // If buffer does not contain this second yet then add it to the buffer
    if (pos === -1) {
      var length = buff.push({time: recievedSecond, metrics: {}});
      _.each(data.metrics, function(metricData, metricName) {
        buff[length - 1].metrics[metricName] = [];
        buff[length - 1].metrics[metricName].push({
          name: data.processName + '#' + data.pid,
          data: metricData,
        });
      });
    } else {
      _.each(data.metrics, function(metricData, metricName) {
        if (_.isUndefined(buff[pos].metrics[metricName])) {
          buff[pos].metrics[metricName] = [];
        };
        buff[pos].metrics[metricName].push ({
          name: data.processName + '#' + data.pid,
          data: metricData,
        });
      });
    }
  });
});

var sendClient = function() {
  // Send current second message with delay
  var currentSec = Math.round(new Date().getTime() / 1000);
  _.each(buff, function(buffElem, buffElemIndex) {
    if ((buffElem.time + delay) === currentSec) {
      io.emit('data', buffElem);
      lastSentSecond = buffElem.time;
    }
  });

  // Remove old seconds descriptions
  _.each(buff, function(buffElem, buffElemIndex) {
    if(buffElem !== undefined) {
      if (buffElem.time < lastSentSecond) {
        buff.splice(buffElemIndex, 1);
      }
    }
  });

  console.log(buff);
}

setInterval(sendClient, 1000);
